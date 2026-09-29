package tr.gov.ogm.reservation.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import tr.gov.ogm.reservation.auth.dto.AuthResponse;
import tr.gov.ogm.reservation.auth.dto.LoginRequest;
import tr.gov.ogm.reservation.auth.dto.RegisterRequest;
import tr.gov.ogm.reservation.common.ApiResponse;
import tr.gov.ogm.reservation.user.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Giriş başarılı"));
    }

    @PostMapping("/register/guest")
    public ResponseEntity<ApiResponse<Map<String, String>>> registerGuest(@Valid @RequestBody RegisterRequest request) {
        User user = authService.registerGuest(request);
        Map<String, String> response = new HashMap<>();
        response.put("email", user.getEmail());
        return ResponseEntity.ok(ApiResponse.ok(response, "Kayıt başarılı"));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Void>> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(401)
                .body(ApiResponse.error("E-posta veya şifre hatalı", "AUTH_ERROR"));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(400)
                .body(ApiResponse.error(ex.getMessage(), "BAD_REQUEST"));
    }
}
