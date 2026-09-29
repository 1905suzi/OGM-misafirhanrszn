package tr.gov.ogm.reservation.request;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.request.dto.RequestDto;

import java.util.List;

@RestController
@RequestMapping("/api/admin/requests")
@RequiredArgsConstructor
public class AdminRequestController {

    private final RequestService requestService;

    @GetMapping
    public ApiResponse<List<RequestDto>> getAllRequests() {
        return ApiResponse.success("Talepler getirildi", requestService.getAllRequests());
    }

    @PatchMapping("/{id}/approve")
    public ApiResponse<RequestDto> approveRequest(@PathVariable Long id) {
        return ApiResponse.success("Talep onaylandı", requestService.approveRequest(id));
    }

    @PatchMapping("/{id}/reject")
    public ApiResponse<RequestDto> rejectRequest(@PathVariable Long id) {
        return ApiResponse.success("Talep reddedildi", requestService.rejectRequest(id));
    }
}
