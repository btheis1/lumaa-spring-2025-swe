CREATE DATABASE tasksapp;

\c tasksapp;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    isComplete BOOLEAN NOT NULL DEFAULT FALSE,
    userId VARCHAR(255) REFERENCES users(id)
);
