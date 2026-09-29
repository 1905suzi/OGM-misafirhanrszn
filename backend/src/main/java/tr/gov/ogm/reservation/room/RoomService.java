package tr.gov.ogm.reservation.room;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.ogm.reservation.room.dto.RoomDto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomDto> getAllRooms() {
        return roomRepository.findAllByOrderByRoomNumberAsc().stream()
                .map(RoomDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<RoomDto> getAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        return roomRepository.findAllByOrderByRoomNumberAsc().stream()
                .filter(r -> r.getAutomaticStatus() == RoomStatus.BOS)
                .map(RoomDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoomDto updateRoomStatus(int roomNumber, RoomStatus manualStatus) {
        Room room = roomRepository.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new RuntimeException("Oda bulunamadı"));
        room.setManualStatus(manualStatus);
        return RoomDto.fromEntity(roomRepository.save(room));
    }
}
