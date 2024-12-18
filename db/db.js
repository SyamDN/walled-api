const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString: process.nextTick.DB_URL
});

module.exports = pool;