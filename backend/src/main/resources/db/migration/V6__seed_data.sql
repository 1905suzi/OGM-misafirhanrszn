-- Seed users
INSERT INTO app_users (email, password_hash, first_name, last_name, phone, identity_number, role, active)
VALUES 
('admin@ogm.gov.tr', '$2b$10$4E8muvuQDDKWmJegHNkrOufUqZa3rRl0L2Nii31p3jlItXc54VM6a', 'Admin', 'Yönetici', '05001234567', '11111111111', 'ADMIN', 1),
('resepsiyon@ogm.gov.tr', '$2b$10$4E8muvuQDDKWmJegHNkrOufUqZa3rRl0L2Nii31p3jlItXc54VM6a', 'Resepsiyon', 'Görevlisi', '05009876543', '22222222222', 'STAFF', 1);

-- Seed announcements
INSERT INTO announcements (type, title, content, announcement_date)
VALUES 
('Duyuru', '2025 Yaz Rezervasyonları', '2025 yaz sezonu rezervasyonları başladı! Erken rezervasyon indirimi için hemen arayın.', '2024-08-01'),
('Bilgi', 'Yeni Aile Odaları', 'Yeni aile odaları Haziran 2025 itibarıyla hizmete girmiştir. Kapasite 100 odaya ulaşmıştır.', '2024-07-15'),
('Etkinlik', 'Doğa Yürüyüşleri', 'Yaz dönemi doğa yürüyüşleri ve piknik etkinlikleri programı açıklandı.', '2024-07-20'),
('Güncelleme', 'Sistem Güncellemesi', 'Online rezervasyon sistemi güncellendi. Artık daha kolay rezervasyon yapabilirsiniz.', '2024-07-25');

-- Seed rooms using Recursive CTE for SQLite compatibility
WITH RECURSIVE cnt(i) AS (
    SELECT 1
    UNION ALL
    SELECT i+1 FROM cnt WHERE i < 100
)
INSERT INTO rooms (room_number, floor, room_type, capacity, automatic_status)
SELECT 
    i,
    CASE 
        WHEN i <= 33 THEN 'CAM_KATI'
        WHEN i <= 66 THEN 'MESE_KATI'
        ELSE 'KAYIN_KATI'
    END,
    CASE 
        WHEN i % 4 = 0 THEN 'Aile Odası'
        WHEN i % 4 = 1 THEN 'Tek Kişilik'
        WHEN i % 4 = 2 THEN 'Çift Kişilik'
        WHEN i % 4 = 3 THEN 'Çok Kişilik'
    END,
    CASE 
        WHEN i % 4 = 0 THEN 4
        WHEN i % 4 = 1 THEN 1
        WHEN i % 4 = 2 THEN 2
        WHEN i % 4 = 3 THEN 3
    END,
    'BOS'
FROM cnt;