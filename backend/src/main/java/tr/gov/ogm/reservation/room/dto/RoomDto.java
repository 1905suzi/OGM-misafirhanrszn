package tr.gov.ogm.reservation.room.dto;

import lombok.Builder;
import lombok.Data;
import tr.gov.ogm.reservation.room.Room;

@Data
@Builder
public class RoomDto {
    private int no;
    private String kat;
    private String tip;
    private int kapasite;
    private String otomatikDurum;
    private String manuelDurum;

    public static RoomDto fromEntity(Room room) {
        return RoomDto.builder()
                .no(room.getRoomNumber())
                .kat(room.getFloor() != null ? room.getFloor().name() : null)
                .tip(room.getRoomType())
                .kapasite(room.getCapacity())
                .otomatikDurum(room.getAutomaticStatus() != null ? room.getAutomaticStatus().name() : null)
                .manuelDurum(room.getManualStatus() != null ? room.getManualStatus().name() : null)
                .build();
    }
}
