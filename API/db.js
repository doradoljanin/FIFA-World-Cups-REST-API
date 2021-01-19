const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ORdb',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = pool;