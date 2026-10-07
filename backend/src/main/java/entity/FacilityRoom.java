package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "facility_rooms")
public class FacilityRoom {

    @Id // Khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_name", nullable = false, unique = true, length = 100) // tên phòng
    private String roomName;

    @Column(name = "floor", length = 20) // tầng lầu
    private String floor;

    @Column(name = "capacity", nullable = false) // sức chứa tối đa của phòng (số người)
    private Integer capacity;

    @Column(name = "description", length = 500) // mô tả trang thiết bị trong phòng
    private String description;

    @Column(name = "maintenance_status", nullable = false, length = 20) // trạng thái ('AVAILABLE', 'MAINTENANCE',
                                                                        // 'CLOSED')
    private String maintenanceStatus = "AVAILABLE";

    public FacilityRoom() {
    }

    public FacilityRoom(Long id, String roomName, String floor, Integer capacity,
            String description, String maintenanceStatus) {
        this.id = id;
        this.roomName = roomName;
        this.floor = floor;
        this.capacity = capacity;
        this.description = description;
        this.maintenanceStatus = maintenanceStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMaintenanceStatus() {
        return maintenanceStatus;
    }

    public void setMaintenanceStatus(String maintenanceStatus) {
        this.maintenanceStatus = maintenanceStatus;
    }
}