package tr.gov.ogm.reservation.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.ogm.reservation.reservation.dto.CreateReservationRequest;
import tr.gov.ogm.reservation.reservation.dto.ReservationDto;
import tr.gov.ogm.reservation.room.Room;
import tr.gov.ogm.reservation.room.RoomRepository;
import tr.gov.ogm.reservation.room.RoomStatus;
import tr.gov.ogm.reservation.user.User;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public ReservationDto createReservation(User user, CreateReservationRequest req) {
        Room room = roomRepository.findByRoomNumber(req.getOdaNo())
                .orElseThrow(() -> new RuntimeException("Oda bulunamadı"));
                
        Reservation reservation = Reservation.builder()
                .reservationNumber("RZ-" + System.currentTimeMillis())
                .guestName(user != null ? user.getFirstName() + " " + user.getLastName() : req.getMisafirAdi())
                .room(room)
                .checkInDate(LocalDate.parse(req.getGiris()))
                .checkOutDate(LocalDate.parse(req.getCikis()))
                .status(ReservationStatus.BEKLEMEDE)
                .user(user)
                .build();
                
        return ReservationDto.fromEntity(reservationRepository.save(reservation));
    }

    public List<ReservationDto> getMyReservations(Long userId) {
        return reservationRepository.findByUserIdOrderByCheckInDateDesc(userId).stream()
                .map(ReservationDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ReservationDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationDto createAdminReservation(CreateReservationRequest req) {
        Room room = roomRepository.findByRoomNumber(req.getOdaNo())
                .orElseThrow(() -> new RuntimeException("Oda bulunamadı"));
                
        Reservation reservation = Reservation.builder()
                .reservationNumber("RZ-" + System.currentTimeMillis())
                .guestName(req.getMisafirAdi())
                .room(room)
                .checkInDate(LocalDate.parse(req.getGiris()))
                .checkOutDate(LocalDate.parse(req.getCikis()))
                .status(req.getDurum() != null ? ReservationStatus.valueOf(req.getDurum()) : ReservationStatus.ONAYLI)
                .build();
                
        return ReservationDto.fromEntity(reservationRepository.save(reservation));
    }

    @Transactional
    public ReservationDto updateStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rezervasyon bulunamadı"));
        
        reservation.setStatus(status);
        
        Room room = reservation.getRoom();
        if (status == ReservationStatus.CHECK_IN) {
            room.setAutomaticStatus(RoomStatus.DOLU);
        } else if (status == ReservationStatus.CHECK_OUT || status == ReservationStatus.IPTAL) {
            room.setAutomaticStatus(RoomStatus.BOS);
        }
        roomRepository.save(room);
        
        return ReservationDto.fromEntity(reservationRepository.save(reservation));
    }

    @Transactional
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
