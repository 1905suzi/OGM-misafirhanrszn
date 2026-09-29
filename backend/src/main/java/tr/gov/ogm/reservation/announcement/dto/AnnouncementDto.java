package tr.gov.ogm.reservation.announcement.dto;

import lombok.Builder;
import lombok.Data;
import tr.gov.ogm.reservation.announcement.Announcement;

@Data
@Builder
public class AnnouncementDto {
    private String id;
    private String tur;
    private String baslik;
    private String icerik;
    private String tarih;

    public static AnnouncementDto fromEntity(Announcement ann) {
        return AnnouncementDto.builder()
                .id(String.valueOf(ann.getId()))
                .tur(ann.getType())
                .baslik(ann.getTitle())
                .icerik(ann.getContent())
                .tarih(ann.getAnnouncementDate() != null ? ann.getAnnouncementDate().toString() : null)
                .build();
    }
}
