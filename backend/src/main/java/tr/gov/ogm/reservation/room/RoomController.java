package tr.gov.ogm.reservation.room;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.room.dto.RoomDto;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ApiResponse<List<RoomDto>> getAvailableRooms(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        if (checkIn != null && checkOut != null) {
            return ApiResponse.success("Uygun odalar getirildi", roomService.getAvailableRooms(checkIn, checkOut));
        }
        return ApiResponse.success("Tüm odalar getirildi", roomService.getAllRooms());
    }
}
