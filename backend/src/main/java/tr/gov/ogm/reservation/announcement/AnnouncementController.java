package tr.gov.ogm.reservation.announcement;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.announcement.dto.AnnouncementDto;

import java.util.List;

@RestController
@RequestMapping("/api/admin/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public ApiResponse<List<AnnouncementDto>> getAll() {
        return ApiResponse.success("Duyurular getirildi", announcementService.getAll());
    }

    @PostMapping
    public ApiResponse<AnnouncementDto> create(@RequestBody AnnouncementDto dto) {
        return ApiResponse.success("Duyuru oluşturuldu", announcementService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<AnnouncementDto> update(@PathVariable Long id, @RequestBody AnnouncementDto dto) {
        return ApiResponse.success("Duyuru güncellendi", announcementService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        announcementService.delete(id);
        return ApiResponse.success("Duyuru silindi", null);
    }
}
