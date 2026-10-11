-- =====================================================================
-- Sports Center Management System (SWP391) - PostgreSQL schema (DRAFT v1)
-- Source: SRS (scope, feature list, swimlanes, business rules BR-*),
--         Conceptual/Logical ERD.
-- Conventions: snake_case, BIGINT identity PKs, TIMESTAMPTZ for instants,
--              money in VND stored as NUMERIC(12,0).
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS btree_gist;   -- needed for room-conflict exclusion

-- ---------------------------------------------------------------------
-- 0. Common helper: auto-maintain updated_at
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------
-- 1. Access control (Role & Permission Management)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code        VARCHAR(30)  NOT NULL UNIQUE,          -- MANAGER, RECEPTIONIST, COACH, MEMBER
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS permissions (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code        VARCHAR(60)  NOT NULL UNIQUE,          -- e.g. USER_MANAGE, REPORT_VIEW
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id       BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- ---------------------------------------------------------------------
-- 2. Users (members, coaches, receptionists, managers share one table)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_id         BIGINT       NOT NULL REFERENCES roles(id),
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(10)  NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    avatar_url      VARCHAR(500),
    gender          VARCHAR(10),
    date_of_birth   DATE,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,   -- BR-AUTH-04
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_users_email UNIQUE (email),             -- BR-AUTH-03
    CONSTRAINT uq_users_phone UNIQUE (phone),             -- BR-AUTH-03
    CONSTRAINT ck_users_phone CHECK (phone ~ '^(03|05|07|08|09)[0-9]{8}$'),  -- BR-AUTH-01
    CONSTRAINT ck_users_gender CHECK (gender IS NULL OR gender IN ('MALE','FEMALE','OTHER')),
    CONSTRAINT ck_users_dob CHECK (date_of_birth IS NULL OR date_of_birth < CURRENT_DATE)
);

DROP TRIGGER IF EXISTS trg_users_updated ON users;
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);

-- Role-specific profile data (1-1 with users)
CREATE TABLE IF NOT EXISTS member_profiles (
    user_id        BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    join_date      DATE NOT NULL DEFAULT CURRENT_DATE,
    height_cm      NUMERIC(5,2) CHECK (height_cm > 0),
    weight_kg      NUMERIC(5,2) CHECK (weight_kg > 0),
    fitness_goal   VARCHAR(500),
    membership_tier VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS coach_profiles (
    user_id          BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    specialty        VARCHAR(255),
    years_experience SMALLINT CHECK (years_experience >= 0),
    certifications   TEXT,
    rating           NUMERIC(2,1) CHECK (rating BETWEEN 0 AND 5)
);

CREATE TABLE IF NOT EXISTS staff_profiles (
    user_id        BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    job_title      VARCHAR(100),
    shift_schedule VARCHAR(255)
);

-- ---------------------------------------------------------------------
-- 3. Facility, sports and classes
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sport_categories (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS facility_rooms (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    room_name          VARCHAR(100) NOT NULL UNIQUE,
    floor              VARCHAR(20),
    capacity           INTEGER NOT NULL CHECK (capacity > 0),
    description        VARCHAR(500),
    maintenance_status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    CONSTRAINT ck_room_status CHECK (maintenance_status IN ('AVAILABLE','MAINTENANCE','CLOSED'))
);

CREATE TABLE IF NOT EXISTS sport_classes (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id  BIGINT       NOT NULL REFERENCES sport_categories(id),
    coach_id     BIGINT       NOT NULL REFERENCES users(id),
    name         VARCHAR(150) NOT NULL,
    description  TEXT,
    level        VARCHAR(20)  NOT NULL DEFAULT 'BEGINNER',
    max_capacity INTEGER      NOT NULL CHECK (max_capacity > 0),
    status       VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT ck_class_level  CHECK (level  IN ('BEGINNER','INTERMEDIATE','ADVANCED')),
    CONSTRAINT ck_class_status CHECK (status IN ('ACTIVE','INACTIVE','CANCELED','COMPLETED'))
);

DROP TRIGGER IF EXISTS trg_classes_updated ON sport_classes;
CREATE TRIGGER trg_classes_updated BEFORE UPDATE ON sport_classes
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_classes_coach    ON sport_classes(coach_id);
CREATE INDEX IF NOT EXISTS idx_classes_category ON sport_classes(category_id);

-- Weekly recurring slots of a class
CREATE TABLE IF NOT EXISTS class_schedules (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    class_id    BIGINT   NOT NULL REFERENCES sport_classes(id) ON DELETE CASCADE,
    room_id     BIGINT   NOT NULL REFERENCES facility_rooms(id),
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time  TIME     NOT NULL,
    end_time    TIME     NOT NULL,
    CONSTRAINT ck_schedule_time CHECK (end_time > start_time),
    CONSTRAINT ex_schedule_room_overlap EXCLUDE USING gist (
        room_id WITH =,
        day_of_week WITH =,
        tsrange(timestamp '2000-01-01' + start_time, timestamp '2000-01-01' + end_time) WITH &&
    )
);
CREATE INDEX IF NOT EXISTS idx_schedules_class ON class_schedules(class_id);

CREATE OR REPLACE FUNCTION trg_check_class_schedule() RETURNS trigger AS $$
DECLARE
    v_room_cap  INTEGER;
    v_max_cap   INTEGER;
    v_coach     BIGINT;
BEGIN
    SELECT capacity INTO v_room_cap FROM facility_rooms WHERE id = NEW.room_id;
    SELECT max_capacity, coach_id INTO v_max_cap, v_coach FROM sport_classes WHERE id = NEW.class_id;

    IF v_max_cap > v_room_cap THEN
        RAISE EXCEPTION 'BR-CLS-01: class max_capacity (%) exceeds room capacity (%)', v_max_cap, v_room_cap;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM class_schedules cs
        JOIN sport_classes c ON c.id = cs.class_id
        WHERE c.coach_id = v_coach
          AND cs.id <> COALESCE(NEW.id, -1)
          AND cs.day_of_week = NEW.day_of_week
          AND cs.start_time < NEW.end_time
          AND cs.end_time   > NEW.start_time
    ) THEN
        RAISE EXCEPTION 'BR-CLS-02: coach already has a class in this time slot';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_class_schedules_check ON class_schedules;
CREATE TRIGGER trg_class_schedules_check
    BEFORE INSERT OR UPDATE ON class_schedules
    FOR EACH ROW EXECUTE FUNCTION trg_check_class_schedule();

CREATE OR REPLACE FUNCTION trg_check_sport_class() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users u JOIN roles r ON r.id = u.role_id
        WHERE u.id = NEW.coach_id AND r.code = 'COACH'
    ) THEN
        RAISE EXCEPTION 'coach_id % does not belong to a user with role COACH', NEW.coach_id;
    END IF;

    IF TG_OP = 'UPDATE' AND EXISTS (
        SELECT 1 FROM class_schedules cs JOIN facility_rooms fr ON fr.id = cs.room_id
        WHERE cs.class_id = NEW.id AND NEW.max_capacity > fr.capacity
    ) THEN
        RAISE EXCEPTION 'BR-CLS-01: max_capacity exceeds capacity of an assigned room';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sport_classes_check ON sport_classes;
CREATE TRIGGER trg_sport_classes_check
    BEFORE INSERT OR UPDATE OF coach_id, max_capacity ON sport_classes
    FOR EACH ROW EXECUTE FUNCTION trg_check_sport_class();

-- ---------------------------------------------------------------------
-- 4. Membership packages, subscriptions, payments
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS membership_packages (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code               VARCHAR(30)  NOT NULL,
    name               VARCHAR(150) NOT NULL,
    description        TEXT,
    duration_months    SMALLINT     NOT NULL,
    price              NUMERIC(12,0) NOT NULL,
    max_classes_per_week SMALLINT   NOT NULL DEFAULT 3,
    is_active          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_package_code UNIQUE (code),
    CONSTRAINT uq_package_name UNIQUE (name),
    CONSTRAINT ck_package_price CHECK (price >= 0),
    CONSTRAINT ck_package_duration CHECK (duration_months >= 1),
    CONSTRAINT ck_package_weekly CHECK (max_classes_per_week >= 1)
);

DROP TRIGGER IF EXISTS trg_packages_updated ON membership_packages;
CREATE TRIGGER trg_packages_updated BEFORE UPDATE ON membership_packages
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS member_subscriptions (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       BIGINT NOT NULL REFERENCES users(id),
    package_id    BIGINT NOT NULL REFERENCES membership_packages(id),
    package_name_snapshot         VARCHAR(150) NOT NULL,
    max_classes_per_week_snapshot SMALLINT     NOT NULL,
    total_amount  NUMERIC(12,0) NOT NULL CHECK (total_amount >= 0),
    start_date    DATE,
    end_date      DATE,
    status        VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_by    BIGINT REFERENCES users(id),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_sub_status CHECK (status IN ('PENDING','ACTIVE','EXPIRED','CANCELED')),
    CONSTRAINT ck_sub_dates  CHECK (end_date IS NULL OR start_date IS NULL OR end_date > start_date),
    CONSTRAINT ck_sub_active_dates CHECK (status <> 'ACTIVE' OR (start_date IS NOT NULL AND end_date IS NOT NULL))
);

DROP TRIGGER IF EXISTS trg_subscriptions_updated ON member_subscriptions;
CREATE TRIGGER trg_subscriptions_updated BEFORE UPDATE ON member_subscriptions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_sub_user_status ON member_subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_sub_package     ON member_subscriptions(package_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_one_active_subscription ON member_subscriptions(user_id) WHERE status = 'ACTIVE';

CREATE TABLE IF NOT EXISTS payments (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    subscription_id  BIGINT NOT NULL REFERENCES member_subscriptions(id),
    payer_id         BIGINT NOT NULL REFERENCES users(id),
    received_by      BIGINT REFERENCES users(id),
    invoice_number   VARCHAR(30)  NOT NULL,
    transaction_code VARCHAR(100) NOT NULL,
    amount           NUMERIC(12,0) NOT NULL CHECK (amount > 0),
    payment_method   VARCHAR(20)  NOT NULL,
    status           VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    paid_at          TIMESTAMPTZ,
    gateway_response TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_payment_transaction UNIQUE (transaction_code),
    CONSTRAINT uq_payment_invoice     UNIQUE (invoice_number),
    CONSTRAINT ck_payment_method CHECK (payment_method IN ('CASH','BANK_TRANSFER','QR_GATEWAY')),
    CONSTRAINT ck_payment_status CHECK (status IN ('PENDING','SUCCESS','FAILED','CANCELED','REFUNDED')),
    CONSTRAINT ck_payment_paid_at CHECK (status <> 'SUCCESS' OR paid_at IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_payment_subscription ON payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_payer        ON payments(payer_id);
CREATE INDEX IF NOT EXISTS idx_payment_paid_at      ON payments(paid_at);

CREATE OR REPLACE FUNCTION trg_activate_subscription() RETURNS trigger AS $$
DECLARE
    v_months SMALLINT;
    v_user   BIGINT;
    v_start  DATE;
BEGIN
    IF NEW.status = 'SUCCESS' AND (TG_OP = 'INSERT' OR OLD.status <> 'SUCCESS') THEN
        SELECT s.user_id, p.duration_months INTO v_user, v_months
        FROM member_subscriptions s JOIN membership_packages p ON p.id = s.package_id
        WHERE s.id = NEW.subscription_id;

        SELECT GREATEST(COALESCE(MAX(end_date), CURRENT_DATE), CURRENT_DATE) INTO v_start
        FROM member_subscriptions
        WHERE user_id = v_user AND status = 'ACTIVE' AND id <> NEW.subscription_id;

        UPDATE member_subscriptions SET status = 'EXPIRED'
         WHERE user_id = v_user AND status = 'ACTIVE' AND id <> NEW.subscription_id;

        UPDATE member_subscriptions
           SET status = 'ACTIVE',
               start_date = v_start,
               end_date = (v_start + make_interval(months => v_months))::date
         WHERE id = NEW.subscription_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_payments_activate ON payments;
CREATE TRIGGER trg_payments_activate
    AFTER INSERT OR UPDATE OF status ON payments
    FOR EACH ROW EXECUTE FUNCTION trg_activate_subscription();

-- ---------------------------------------------------------------------
-- 5. Class registration (booking / waitlist / cancel) and attendance
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS class_registrations (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    class_id          BIGINT NOT NULL REFERENCES sport_classes(id),
    user_id           BIGINT NOT NULL REFERENCES users(id),
    registered_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    status            VARCHAR(20) NOT NULL DEFAULT 'REGISTERED',
    canceled_at       TIMESTAMPTZ,
    is_penalized      BOOLEAN NOT NULL DEFAULT FALSE,
    registered_by     BIGINT REFERENCES users(id),
    CONSTRAINT uq_class_member UNIQUE (class_id, user_id),
    CONSTRAINT ck_reg_status CHECK (status IN ('REGISTERED','WAITLISTED','CANCELED','LATE_CANCELED'))
);
CREATE INDEX IF NOT EXISTS idx_reg_user ON class_registrations(user_id);

CREATE OR REPLACE FUNCTION trg_check_registration() RETURNS trigger AS $$
DECLARE
    v_cap     INTEGER;
    v_count   INTEGER;
    v_weekly  SMALLINT;
    v_used    INTEGER;
BEGIN
    IF NEW.status <> 'REGISTERED' THEN
        RETURN NEW;
    END IF;
    IF TG_OP = 'UPDATE' AND OLD.status = 'REGISTERED' THEN
        RETURN NEW;
    END IF;

    SELECT max_classes_per_week_snapshot INTO v_weekly
    FROM member_subscriptions
    WHERE user_id = NEW.user_id AND status = 'ACTIVE' AND CURRENT_DATE BETWEEN start_date AND end_date;
    IF v_weekly IS NULL THEN
        RAISE EXCEPTION 'BR-BKG-01: member has no ACTIVE membership';
    END IF;

    SELECT max_capacity INTO v_cap FROM sport_classes WHERE id = NEW.class_id FOR UPDATE;
    SELECT count(*) INTO v_count FROM class_registrations
     WHERE class_id = NEW.class_id AND status = 'REGISTERED' AND id <> COALESCE(NEW.id, -1);
    IF v_count >= v_cap THEN
        RAISE EXCEPTION 'BR-BKG-02: class is full';
    END IF;

    SELECT count(*) INTO v_used FROM class_registrations
     WHERE user_id = NEW.user_id AND status = 'REGISTERED'
       AND id <> COALESCE(NEW.id, -1)
       AND date_trunc('week', registered_at) = date_trunc('week', now());
    IF v_used >= v_weekly THEN
        RAISE EXCEPTION 'BR-BKG-03: weekly class limit (%) reached', v_weekly;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_class_registrations_check ON class_registrations;
CREATE TRIGGER trg_class_registrations_check
    BEFORE INSERT OR UPDATE OF status ON class_registrations
    FOR EACH ROW EXECUTE FUNCTION trg_check_registration();

CREATE TABLE IF NOT EXISTS class_attendances (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    class_id       BIGINT NOT NULL REFERENCES sport_classes(id),
    user_id        BIGINT NOT NULL REFERENCES users(id),
    session_date   DATE   NOT NULL,
    status         VARCHAR(10) NOT NULL,
    check_in_time  TIMESTAMPTZ,
    recorded_by    BIGINT REFERENCES users(id),
    notes          VARCHAR(500),
    CONSTRAINT uq_class_attendance UNIQUE (class_id, user_id, session_date),
    CONSTRAINT ck_attendance_status CHECK (status IN ('PRESENT','ABSENT','LATE','EXCUSED'))
);
CREATE INDEX IF NOT EXISTS idx_class_att_user ON class_attendances(user_id);

CREATE TABLE IF NOT EXISTS facility_attendances (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        BIGINT NOT NULL REFERENCES users(id),
    check_in_time  TIMESTAMPTZ NOT NULL DEFAULT now(),
    check_out_time TIMESTAMPTZ,
    recorded_by    BIGINT REFERENCES users(id),
    notes          VARCHAR(500),
    CONSTRAINT ck_facility_att_time CHECK (check_out_time IS NULL OR check_out_time >= check_in_time)
);
CREATE INDEX IF NOT EXISTS idx_facility_att_user ON facility_attendances(user_id, check_in_time);

-- ---------------------------------------------------------------------
-- 6. Training: workout plans and progress
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workout_plans (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id     BIGINT NOT NULL REFERENCES users(id),
    coach_id      BIGINT NOT NULL REFERENCES users(id),
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    content       JSONB,
    is_ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    start_date    DATE,
    end_date      DATE,
    status        VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_plan_status CHECK (status IN ('DRAFT','PUBLISHED','COMPLETED','ARCHIVED')),
    CONSTRAINT ck_plan_dates  CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

DROP TRIGGER IF EXISTS trg_plans_updated ON workout_plans;
CREATE TRIGGER trg_plans_updated BEFORE UPDATE ON workout_plans
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_plan_member ON workout_plans(member_id);
CREATE INDEX IF NOT EXISTS idx_plan_coach  ON workout_plans(coach_id);

CREATE TABLE IF NOT EXISTS workout_progress (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plan_id       BIGINT REFERENCES workout_plans(id) ON DELETE SET NULL,
    member_id     BIGINT NOT NULL REFERENCES users(id),
    recorded_by   BIGINT REFERENCES users(id),
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg     NUMERIC(5,2) CHECK (weight_kg > 0),
    height_cm     NUMERIC(5,2) CHECK (height_cm > 0),
    body_fat_pct  NUMERIC(4,1) CHECK (body_fat_pct BETWEEN 0 AND 100),
    muscle_mass_kg NUMERIC(5,2) CHECK (muscle_mass_kg > 0),
    notes         TEXT
);
CREATE INDEX IF NOT EXISTS idx_progress_member ON workout_progress(member_id, recorded_date);

-- ---------------------------------------------------------------------
-- 7. Communication, support, AI assistant
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipient_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id    BIGINT REFERENCES users(id),
    type         VARCHAR(30) NOT NULL,
    title        VARCHAR(200) NOT NULL,
    content      TEXT,
    is_read      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_notification_type CHECK (type IN
        ('ANNOUNCEMENT','HOMEWORK','WORKOUT_PLAN','MEMBERSHIP','BOOKING','SYSTEM'))
);
CREATE INDEX IF NOT EXISTS idx_notification_recipient ON notifications(recipient_id, is_read);

CREATE TABLE IF NOT EXISTS support_requests (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id   BIGINT NOT NULL REFERENCES users(id),
    handled_by  BIGINT REFERENCES users(id),
    subject     VARCHAR(200) NOT NULL,
    content     TEXT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ,
    CONSTRAINT ck_support_status CHECK (status IN ('OPEN','IN_PROGRESS','RESOLVED','CLOSED'))
);

CREATE TABLE IF NOT EXISTS ai_chat_logs (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id),
    question    TEXT NOT NULL,
    answer      TEXT,
    status      VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_ai_status CHECK (status IN ('SUCCESS','REJECTED','ERROR'))
);
CREATE INDEX IF NOT EXISTS idx_ai_chat_user ON ai_chat_logs(user_id, created_at);

-- ---------------------------------------------------------------------
-- 8. Audit log (BR-SYS-01: append-only)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id      BIGINT REFERENCES users(id),
    action       VARCHAR(50)  NOT NULL,
    resource     VARCHAR(100) NOT NULL,
    resource_id  VARCHAR(50),
    payload_diff JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_user    ON audit_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);

CREATE OR REPLACE FUNCTION trg_audit_immutable() RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'BR-SYS-01: audit_logs is append-only';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_logs_immutable ON audit_logs;
CREATE TRIGGER trg_audit_logs_immutable
    BEFORE UPDATE OR DELETE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION trg_audit_immutable();

DROP TRIGGER IF EXISTS trg_audit_logs_no_truncate ON audit_logs;
CREATE TRIGGER trg_audit_logs_no_truncate
    BEFORE TRUNCATE ON audit_logs
    FOR EACH STATEMENT EXECUTE FUNCTION trg_audit_immutable();

-- ---------------------------------------------------------------------
-- 9. Reference data
-- ---------------------------------------------------------------------
INSERT INTO roles (code, name, description) VALUES
    ('MANAGER',      'Center Manager', 'Full management access'),
    ('RECEPTIONIST', 'Receptionist',   'Front-desk operations'),
    ('COACH',        'Coach',          'Teaches classes and tracks students'),
    ('MEMBER',       'Member',         'Default role for public registration (BR-AUTH-05)')
ON CONFLICT (code) DO NOTHING;

INSERT INTO permissions (code, name) VALUES
    ('USER_MANAGE',        'Manage users and staff'),
    ('ROLE_MANAGE',        'Manage roles and permissions'),
    ('CLASS_MANAGE',       'Manage sports, classes, rooms and schedules'),
    ('PACKAGE_MANAGE',     'Manage membership packages'),
    ('REPORT_VIEW',        'View reports'),
    ('AUDIT_VIEW',         'View activity history'),
    ('MEMBER_VIEW',        'Search and view member information'),
    ('MEMBER_REGISTER',    'Register members'),
    ('SUBSCRIPTION_MANAGE','Register / renew memberships'),
    ('BOOKING_MANAGE',     'Register or cancel classes for members'),
    ('ATTENDANCE_MANAGE',  'Record attendance'),
    ('PAYMENT_MANAGE',     'Record payments and invoices'),
    ('SUPPORT_MANAGE',     'Manage support requests'),
    ('STUDENT_VIEW',       'View assigned students'),
    ('WORKOUT_MANAGE',     'Manage workout plans and progress'),
    ('AI_USE',             'Use AI features')
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON
    (r.code = 'MANAGER') OR
    (r.code = 'RECEPTIONIST' AND p.code IN ('MEMBER_VIEW','MEMBER_REGISTER','SUBSCRIPTION_MANAGE',
        'BOOKING_MANAGE','ATTENDANCE_MANAGE','PAYMENT_MANAGE','SUPPORT_MANAGE')) OR
    (r.code = 'COACH' AND p.code IN ('STUDENT_VIEW','ATTENDANCE_MANAGE','WORKOUT_MANAGE','AI_USE')) OR
    (r.code = 'MEMBER' AND p.code IN ('AI_USE'))
ON CONFLICT DO NOTHING;
