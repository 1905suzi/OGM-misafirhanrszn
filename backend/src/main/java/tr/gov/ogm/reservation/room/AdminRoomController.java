package tr.gov.ogm.reservation.room;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.room.dto.RoomDto;

import java.util.List;

@RestController
@RequestMapping("/api/admin/rooms")
@RequiredArgsConstructor
public class AdminRoomController {

    private final RoomService roomService;

    @GetMapping
    public ApiResponse<List<RoomDto>> getAllRooms() {
        return ApiResponse.success("Odalar getirildi", roomService.getAllRooms());
    }

    @PatchMapping("/{roomNumber}/status")
    public ApiResponse<RoomDto> updateRoomStatus(
            @PathVariable int roomNumber,
            @RequestBody UpdateStatusRequest request) {
        RoomStatus status = request.getManuelDurum() != null ? RoomStatus.valueOf(request.getManuelDurum()) : null;
        return ApiResponse.success("Oda durumu güncellendi", roomService.updateRoomStatus(roomNumber, status));
    }

    @Data
    public static class UpdateStatusRequest {
        private String manuelDurum;
    }
}
