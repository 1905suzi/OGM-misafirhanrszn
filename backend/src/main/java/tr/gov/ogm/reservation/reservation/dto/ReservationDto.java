package tr.gov.ogm.reservation.reservation.dto;

import lombok.Builder;
import lombok.Data;
import tr.gov.ogm.reservation.reservation.Reservation;

import java.time.temporal.ChronoUnit;

@Data
@Builder
public class ReservationDto {
    private long id;
    private String rezNo;
    private String misafirAdi;
    private int odaNo;
    private String giris;
    private String cikis;
    private int gece;
    private String durum;

    public static ReservationDto fromEntity(Reservation r) {
        int nights = (int) ChronoUnit.DAYS.between(r.getCheckInDate(), r.getCheckOutDate());
        return ReservationDto.builder()
                .id(r.getId())
                .rezNo(r.getReservationNumber())
                .misafirAdi(r.getGuestName())
                .odaNo(r.getRoom() != null ? r.getRoom().getRoomNumber() : 0)
                .giris(r.getCheckInDate() != null ? r.getCheckInDate().toString() : null)
                .cikis(r.getCheckOutDate() != null ? r.getCheckOutDate().toString() : null)
                .gece(nights > 0 ? nights : 1)
                .durum(r.getStatus() != null ? r.getStatus().name() : null)
                .build();
    }
}
