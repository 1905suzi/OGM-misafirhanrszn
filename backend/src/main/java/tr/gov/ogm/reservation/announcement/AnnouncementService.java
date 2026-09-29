package tr.gov.ogm.reservation.announcement;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.ogm.reservation.announcement.dto.AnnouncementDto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public List<AnnouncementDto> getAll() {
        return announcementRepository.findAllByOrderByAnnouncementDateDesc().stream()
                .map(AnnouncementDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public AnnouncementDto create(AnnouncementDto dto) {
        Announcement announcement = Announcement.builder()
                .type(dto.getTur())
                .title(dto.getBaslik())
                .content(dto.getIcerik())
                .announcementDate(dto.getTarih() != null ? LocalDate.parse(dto.getTarih()) : LocalDate.now())
                .build();
        return AnnouncementDto.fromEntity(announcementRepository.save(announcement));
    }

    @Transactional
    public AnnouncementDto update(Long id, AnnouncementDto dto) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Duyuru bulunamadı"));
        announcement.setType(dto.getTur());
        announcement.setTitle(dto.getBaslik());
        announcement.setContent(dto.getIcerik());
        if (dto.getTarih() != null) {
            announcement.setAnnouncementDate(LocalDate.parse(dto.getTarih()));
        }
        return AnnouncementDto.fromEntity(announcementRepository.save(announcement));
    }

    @Transactional
    public void delete(Long id) {
        announcementRepository.deleteById(id);
    }
}
