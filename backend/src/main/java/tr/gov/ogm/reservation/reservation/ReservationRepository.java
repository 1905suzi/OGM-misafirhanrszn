package tr.gov.ogm.reservation.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.ogm.reservation.room.Room;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserIdOrderByCheckInDateDesc(Long userId);
    List<Reservation> findAllByOrderByCreatedAtDesc();
}
