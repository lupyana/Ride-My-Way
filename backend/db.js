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
const createRidesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      rides(
        id SERIAL PRIMARY KEY,
        ride_start VARCHAR(128) NOT NULL,
        ride_to VARCHAR(128) NOT NULL,
        ride_time VARCHAR(128) NOT NULL,
        ride_with VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 0,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

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

const createRidesRequestTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      rides_requests(
        id SERIAL PRIMARY KEY,
        ride_id VARCHAR(128) NOT NULL,
        user_id VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 5,
        created_date TIMESTAMP NOT NULL DEFAULT NOW(),
        modified_date TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

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

const createUsersTable = () => {
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createUserActivationTable = () => {
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
// Create all Tables
const createAllTables = () => {
  createRidesRequestTable();
  createUsersTable();
  createUserActivationTable();
  createRidesTable();
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
  createAllTables,
  dropTables,
  createUsersTable,
  createRidesTable,
  createUserActivationTable,
  createRidesRequestTable,
};

require('make-runnable');
