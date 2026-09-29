package tr.gov.ogm.reservation.request;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.gov.ogm.reservation.request.dto.RequestDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;

    public List<RequestDto> getAllRequests() {
        return requestRepository.findAllByOrderByRequestDateDesc().stream()
                .map(RequestDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public RequestDto approveRequest(Long id) {
        ReservationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talep bulunamadı"));
        request.setStatus(RequestStatus.ONAYLANDI);
        return RequestDto.fromEntity(requestRepository.save(request));
    }

    @Transactional
    public RequestDto rejectRequest(Long id) {
        ReservationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talep bulunamadı"));
        request.setStatus(RequestStatus.REDDEDILDI);
        return RequestDto.fromEntity(requestRepository.save(request));
    }
}
