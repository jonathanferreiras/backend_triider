CREATE SEQUENCE schedules_seq;

CREATE TABLE schedules (
  idschedules INTEGER CHECK (idschedules > 0) NOT NULL DEFAULT NEXTVAL ('schedules_seq'),
  users_iduser INTEGER CHECK (users_iduser > 0) NOT NULL,
  name VARCHAR(100) NULL,
  date TIMESTAMP(0) NULL,
  place VARCHAR(200) NULL,
  blocking BOOL NULL,
  requester   INTEGER CHECK (requester > 0) NOT NULL,
  PRIMARY KEY(idschedules)
);

CREATE INDEX schedules_FKIndex1 ON schedules(users_iduser);

CREATE SEQUENCE users_seq;

CREATE TYPE type_user AS ENUM('user','animator');
CREATE TYPE type_animator AS ENUM('clown','magic','juggler');
 

CREATE TABLE users (
  iduser INTEGER CHECK (iduser > 0) NOT NULL DEFAULT NEXTVAL ('users_seq'),
  name VARCHAR(200) NULL,
  email VARCHAR(50) NULL,
  pass VARCHAR(50) NULL,
  type_user type_user,
  price DOUBLE PRECISION NULL,
  type_animator type_animator,
  PRIMARY KEY(iduser)
);