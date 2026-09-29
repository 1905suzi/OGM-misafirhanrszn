package tr.gov.ogm.reservation.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.user.dto.UserDto;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;

    @GetMapping
    public ApiResponse<List<UserDto>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
        return ApiResponse.success("Kullanıcılar getirildi", users);
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<UserDto> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        user.setActive(req.isAktif());
        userRepository.save(user);
        return ApiResponse.success("Kullanıcı durumu güncellendi", UserDto.fromEntity(user));
    }

    @Data
    public static class UpdateStatusRequest {
        private boolean aktif;
    }
}
