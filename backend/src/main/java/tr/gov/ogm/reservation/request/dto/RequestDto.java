package tr.gov.ogm.reservation.request.dto;

import lombok.Builder;
import lombok.Data;
import tr.gov.ogm.reservation.request.ReservationRequest;

@Data
@Builder
public class RequestDto {
    private String id;
    private String tip;
    private String rezNo;
    private String misafirAdi;
    private int odaNo;
    private String tarih;
    private String durum;
    private String notlar;

    public static RequestDto fromEntity(ReservationRequest req) {
        return RequestDto.builder()
                .id(String.valueOf(req.getId()))
                .tip(req.getType() != null ? req.getType().name() : null)
                .rezNo(req.getReservation() != null ? req.getReservation().getReservationNumber() : null)
                .misafirAdi(req.getReservation() != null ? req.getReservation().getGuestName() : null)
                .odaNo(req.getReservation() != null && req.getReservation().getRoom() != null ? req.getReservation().getRoom().getRoomNumber() : 0)
                .tarih(req.getRequestDate() != null ? req.getRequestDate().toString() : null)
                .durum(req.getStatus() != null ? req.getStatus().name() : null)
                .notlar(req.getNotes())
                .build();
    }
}
