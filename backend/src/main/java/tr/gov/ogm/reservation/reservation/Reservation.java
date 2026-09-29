package tr.gov.ogm.reservation.reservation;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.ogm.reservation.common.BaseEntity;
import tr.gov.ogm.reservation.room.Room;
import tr.gov.ogm.reservation.user.User;

import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation extends BaseEntity {

    @Column(name = "reservation_number", unique = true)
    private String reservationNumber;

    @Column(name = "guest_name")
    private String guestName;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
