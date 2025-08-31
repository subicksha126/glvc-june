CREATE DATABASE IF NOT EXISTS client_mgmt;
USE client_mgmt;

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(40),
  company VARCHAR(160),
  status ENUM('Active','Archived') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  `when` DATETIME NOT NULL,
  mode ENUM('Online','In-Person') NOT NULL DEFAULT 'Online',
  notes TEXT,
  outcome TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_meetings_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

INSERT INTO clients (name,email,phone,company) VALUES
('Jane Doe','jane@acme.com','+91 98765 43210','ACME Corp'),
('Rahul Kumar','rahul@globex.com','+91 98111 22222','Globex');

INSERT INTO meetings (client_id,title,`when`,mode,notes) VALUES
(1,'Kickoff with ACME','2025-09-05 10:00:00','Online','Scope & milestones'),
(2,'Quarterly Review','2025-09-10 15:30:00','In-Person','Performance & next steps');
