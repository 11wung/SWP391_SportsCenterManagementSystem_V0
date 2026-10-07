package entity;

import java.io.Serializable;
import java.util.Objects;

public class RolePermissionId implements Serializable {

    private Long roleId;

    private Long permissionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RolePermissionId)) return false;

        RolePermissionId that = (RolePermissionId) o;

        return Objects.equals(roleId, that.roleId)
                && Objects.equals(permissionId, that.permissionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, permissionId);
    }
}