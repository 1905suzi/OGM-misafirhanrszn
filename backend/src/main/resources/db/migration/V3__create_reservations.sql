CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reservation_number VARCHAR(32) NOT NULL UNIQUE,
    guest_name VARCHAR(200) NOT NULL,
    room_id BIGINT NOT NULL REFERENCES rooms(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'BEKLEMEDE',
    user_id BIGINT REFERENCES app_users(id),
    CONSTRAINT reservation_dates_valid CHECK (check_out_date > check_in_date)
);
