package tr.gov.ogm.reservation.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.reservation.dto.CreateReservationRequest;
import tr.gov.ogm.reservation.reservation.dto.ReservationDto;
import tr.gov.ogm.reservation.user.User;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ApiResponse<ReservationDto> createReservation(@RequestBody CreateReservationRequest req) {
        // Assume User is retrieved from SecurityContext; passing null for now as placeholder
        return ApiResponse.success("Rezervasyon oluşturuldu", reservationService.createReservation(null, req));
    }

    @GetMapping("/mine")
    public ApiResponse<List<ReservationDto>> getMyReservations() {
        // Assume userId is retrieved from SecurityContext; passing 1L for now as placeholder
        return ApiResponse.success("Rezervasyonlar getirildi", reservationService.getMyReservations(1L));
    }
}
