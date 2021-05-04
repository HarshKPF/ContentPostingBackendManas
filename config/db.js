const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool
.connect()
.then(() => console.log('Database Connected'))
.catch(err => console.error('Error Connecting to DB: ', err.stack));

module.exports = {
  query: (text, params) => pool.query(text, params),
};