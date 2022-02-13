const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"ApriHunte#123",
    host:"localhost",
    port:5432,
    database: "hockeyrsvp"
});

module.exports = pool;