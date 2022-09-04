CREATE DATABASE HockeyRSVP;

CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    email VARCHAR ( 255 ), 
    status VARCHAR ( 255 ),
    guests VARCHAR ( 255 ),
    paid VARCHAR ( 255 ),
    position VARCHAR ( 255 )
);

CREATE TABLE history(
    game_id SERIAL PRIMARY KEY,
    date VARCHAR ( 255 ), 
    white VARCHAR ( 255 ),
    black VARCHAR ( 255 )
);

-- psql -U postgres
-- \l
-- \c nikolasmilanovic
-- \dt
-- CREATE DATABASE HockeyRSVP;
-- \l
-- \c HockeyRSVP
-- \dt