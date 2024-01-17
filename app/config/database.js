/* eslint-disable no-console */
const knex = require('knex');

/* knex query generator implementation */
const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  debug: true,
  log: {
    warn(message) {
      console.log('err', message);
    },
    error(message) {
      console.log('err', message);
    },
    deprecate(message) {
      console.log('err', message);
    },
    debug(message) {
      console.log('Quert', message);
    },
  },
});

module.exports = db;
