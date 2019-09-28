DROP DATABASE modulo;

CREATE DATABASE IF NOT EXISTS modulo;

USE modulo;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(40) UNIQUE,
    password VARCHAR(64),
    salt VARCHAR(64),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS globalTasks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    createdBy INT,
    description VARCHAR(140),
    upvotes SMALLINT,
    accepted SMALLINT,
    completed SMALLINT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE
);

