const Pool = require("pg").Pool;

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'ORdb',
   password: 'bazepodataka',
   port: 5432,
});

module.exports = pool;

/*
{
   query: (text, params) => {
       const start = Date.now();
       return pool.query(text, params)
           .then(res => {
               const duration = Date.now() - start;
               return res;
           });
   }
}
*/