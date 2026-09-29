package tr.gov.ogm.reservation.reservation;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.reservation.dto.CreateReservationRequest;
import tr.gov.ogm.reservation.reservation.dto.ReservationDto;

import java.util.List;

@RestController
@RequestMapping("/api/admin/reservations")
@RequiredArgsConstructor
public class AdminReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ApiResponse<List<ReservationDto>> getAllReservations() {
        return ApiResponse.success("Rezervasyonlar getirildi", reservationService.getAllReservations());
    }

    @PostMapping
    public ApiResponse<ReservationDto> createAdminReservation(@RequestBody CreateReservationRequest req) {
        return ApiResponse.success("Rezervasyon oluşturuldu", reservationService.createAdminReservation(req));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<ReservationDto> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
        return ApiResponse.success("Durum güncellendi", reservationService.updateStatus(id, ReservationStatus.valueOf(req.getDurum())));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ApiResponse.success("Rezervasyon silindi", null);
    }

    @Data
    public static class UpdateStatusRequest {
        private String durum;
    }
}
