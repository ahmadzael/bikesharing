var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'tugas',
  user: 'postgres'
});

module.exports = db
