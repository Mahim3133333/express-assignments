DROP TABLE IF EXISTS wsk_cats;
DROP TABLE IF EXISTS wsk_users;

CREATE TABLE wsk_users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE wsk_cats (
  cat_id INT AUTO_INCREMENT PRIMARY KEY,
  cat_name VARCHAR(100) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  owner INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  CONSTRAINT fk_cat_owner
    FOREIGN KEY (owner)
    REFERENCES wsk_users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO wsk_users
(name, username, email, role, password)
VALUES
('Nadia Rahman', 'nadia', 'nadia@example.com', 'user', 'password123'),
('Sami Khan', 'sami', 'sami@example.com', 'user', 'mypassword'),
('Admin User', 'admin', 'admin@example.com', 'admin', 'admin12345');

INSERT INTO wsk_cats
(cat_name, weight, owner, filename, birthdate)
VALUES
('Milo', 5.20, 1, 'cat.jpg', '2021-09-18'),
('Luna', 4.10, 2, 'luna.jpg', '2022-03-11');
