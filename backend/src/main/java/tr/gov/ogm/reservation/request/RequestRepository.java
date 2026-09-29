package tr.gov.ogm.reservation.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<ReservationRequest, Long> {
    List<ReservationRequest> findAllByOrderByRequestDateDesc();
}
