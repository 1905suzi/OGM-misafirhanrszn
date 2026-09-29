package tr.gov.ogm.reservation.announcement;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.ogm.reservation.common.BaseEntity;

import java.time.LocalDate;

@Entity
@Table(name = "announcements")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement extends BaseEntity {

    private String type;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "announcement_date")
    private LocalDate announcementDate;
}
