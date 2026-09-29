package tr.gov.ogm.reservation.reservation.dto;

import lombok.Data;

@Data
public class CreateReservationRequest {
    private int odaNo;
    private String giris;
    private String cikis;
    private Integer yetiskinSayisi;
    private Integer cocukSayisi;
    private String notlar;
    
    // For admin
    private String misafirAdi;
    private String durum;
}
