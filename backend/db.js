const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createRideTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      rides(
        id SERIAL PRIMARY KEY,
        ride_start VARCHAR(128) NOT NULL,
        ride_to VARCHAR(128) NOT NULL,
        ride_time VARCHAR(128) NOT NULL,
        ride_with VARCHAR(128) NOT NULL,
        status numeric DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log('here');
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log('here');

      console.log(err);
      pool.end();
    });
};

const createUsersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        fname VARCHAR(128) NOT NULL,
        lname VARCHAR(128) NOT NULL,
        active numeric DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log('here');
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log('here');

      console.log(err);
      pool.end();
    });
};

const createUsersActivationTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      user_activation(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(128) NOT NULL,
        code VARCHAR(128) NOT NULL,
        status numeric DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log('here');
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log('here');

      console.log(err);
      pool.end();
    });
};
// Create all Tables
const createTables = () => {
  createUsersTables();
  createUsersActivationTable();
  createRideTables();
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS rides';
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  createUsersTables,
  createRideTables,
  createUsersActivationTable,
};

require('make-runnable');
