package tr.gov.ogm.reservation.room;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.ogm.reservation.common.BaseEntity;

@Entity
@Table(name = "rooms")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room extends BaseEntity {
    
    @Column(name = "room_number", unique = true)
    private int roomNumber;

    @Enumerated(EnumType.STRING)
    private Floor floor;

    @Column(name = "room_type")
    private String roomType;

    private int capacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "automatic_status")
    private RoomStatus automaticStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "manual_status")
    private RoomStatus manualStatus;
}
