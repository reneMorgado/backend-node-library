-- Configuración inicial para que funcione
CREATE USER IF NOT EXISTS 'SA'@'localhost' IDENTIFIED BY 'Pass123!';
GRANT ALL PRIVILEGES ON * . * TO 'SA'@'localhost';

CREATE DATABASE NodeTest;
USE NodeTest;

