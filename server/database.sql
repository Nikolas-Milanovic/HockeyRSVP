CREATE DATABASE HockeyRSVP;

CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    email VARCHAR ( 255 ), 
    status VARCHAR ( 255 )
);