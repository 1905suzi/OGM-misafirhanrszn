package tr.gov.ogm.reservation.request;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.ogm.reservation.common.BaseEntity;
import tr.gov.ogm.reservation.reservation.Reservation;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation_requests")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequest extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private RequestType type;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String notes;
}
