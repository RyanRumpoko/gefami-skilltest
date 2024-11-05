.env file req :

PORT=
DB_PASSWORD=
SECRET=

DDL :

CREATE DATABASE gefami_SQL;
CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(255),password VARCHAR(255));
CREATE TABLE books (id SERIAL PRIMARY KEY,title VARCHAR(255),is_returned BOOLEAN);
CREATE TABLE customers (id SERIAL PRIMARY KEY,name VARCHAR(255),phone_number VARCHAR(255),book_title VARCHAR(255),in_date DATE,out_date DATE,is_late BOOLEAN);
