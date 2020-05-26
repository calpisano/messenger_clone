
CREATE SCHEMA IF NOT EXISTS messenger;

SET search_path TO messenger,public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS messenger.chat_user (
    user_uid UUID NOT NULL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(320) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    date_of_birth DATE,
    profile_pic VARCHAR(2048),
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS messenger.chat_thread (
    thread_uid UUID NOT NULL PRIMARY KEY,
    user_uid UUID NOT NULL REFERENCES messenger.chat_user (user_uid),
    participant_user_uid UUID NOT NULL REFERENCES messenger.chat_user (user_uid)
);

CREATE TABLE IF NOT EXISTS messenger.chat_line (
    line_uid UUID NOT NULL PRIMARY KEY,
    thread_uid UUID NOT NULL REFERENCES messenger.chat_thread (thread_uid),
    created_by_user_uid UUID NOT NULL REFERENCES messenger.chat_user (user_uid),
    line_text TEXT NOT NULL,
    created_at_timestamp TIMESTAMPTZ NOT NULL
);

insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Myra', 'Selfie', 'myraselfie@gmail.com', 'Female', '1991-01-01', '/default-profile-pic.png');

insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Elmore', 'Greswell', 'nusluis3@domainmarket.com', 'Male', '1991-05-06', '/default-profile-pic.png');
insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Derry', 'Singh', 'dsingh1@newsvine.com', 'Male', '1981-08-16', '/default-profile-pic.png');
insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Chane', 'Ambroisin', 'cambroisin2@blogtalkradio.com', 'Female', '2003-01-12', '/default-profile-pic.png');
insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Sarge', 'Luis', 'sluis23@domainmarket.com', 'Male', '1990-09-10', '/default-profile-pic.png');
insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Annie', 'Oby', 'bobroyd5@yahoo.com', 'Female', '2004-04-22', '/annie-oby.png');
insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Sonya', 'Boothroyd', 'sboothroyd5@yahoo.com', 'Female', '2018-04-24', '/sonya-boothroyd.png');
-- insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Clerkclaude', 'Lortz', 'clortz6@yahoo.com', 'Male', '2017-03-09', '/default-profile-pic.png');
-- insert into messenger.chat_user (user_uid, first_name, last_name, email, gender, date_of_birth, profile_pic) values (uuid_generate_v4(), 'Bale', 'Southwood', 'haroldman6@yahoo.com', 'Male', '1992-12-18', '/default-profile-pic.png');

-- insert into messenger.chat_thread (thread_uid, user_uid, participant_user_uid) values (uuid_generate_v4(), 'SOME HOST USER_UID', 'SOME PARTICIPANT USER_UID' );
-- insert into messenger.chat_line (line_uid, thread_uid, created_by_user_uid, line_text, created_at_timestamp) values (uuid_generate_v4(), 'SOME HOST THREAD ID', 'SOME HOST OR GUEST USER ID', 'Sample message', NOW() );