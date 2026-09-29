package tr.gov.ogm.reservation.user.dto;

import lombok.Builder;
import lombok.Data;
import tr.gov.ogm.reservation.user.User;

@Data
@Builder
public class UserDto {
    private String id;
    private String tcSicilNo;
    private String adSoyad;
    private String eposta;
    private String rol;
    private boolean aktif;

    public static UserDto fromEntity(User user) {
        String roleStr = "Misafir";
        if (user.getRole() != null) {
            switch (user.getRole().name()) {
                case "ADMIN": roleStr = "Yönetici"; break;
                case "STAFF": roleStr = "Personel"; break;
                default: roleStr = "Misafir"; break;
            }
        }
        return UserDto.builder()
                .id(String.valueOf(user.getId()))
                .tcSicilNo(user.getIdentityNumber())
                .adSoyad(user.getFirstName() + " " + user.getLastName())
                .eposta(user.getEmail())
                .rol(roleStr)
                .aktif(user.isActive())
                .build();
    }
}
