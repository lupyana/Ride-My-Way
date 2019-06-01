import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const SECRET_KEY = 'secretkey23456';
const expiresIn = 24 * 60 * 60;

const User = {
  register(req, res) {
    if (!req.body.email || !req.body.password || !req.body.fname || !req.body.lname) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check if existing
    const query = 'SELECT * FROM users WHERE email = $1';
    db.query(query, [req.body.email])
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(400).send({ message: 'Email already exists' });
        }
        const hash = bcrypt.hashSync(req.body.password, salt);
        const query = `INSERT INTO
          users(email, password, fname, lname)
          VALUES($1, $2, $3, $4)
          returning id`;
        const values = [req.body.email, hash, req.body.fname, req.body.lname];

        const query2 = `INSERT INTO
          user_activation(user_id, code)
          VALUES($1, $2)
          returning *`;

        const code = Math.floor(Math.random() * 90000) + 10000;

        db.query(query, values)
          .then((result) => {
            db.query(query2, [result.rows[0].id, code]).then(result => res.status(201).send({
              code,
              message:
                  'We have sent a verification code to your email! Enter the code to complete the verification process',
            }));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  verify(req, res) {
    if (!req.body.id || !req.body.code) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const query = 'SELECT * FROM user_activation WHERE user_id = $1 AND code = $2';

    db.query(query, [req.body.id, req.body.code]).then((result) => {
      if (!result.rows[0]) {
        return res.status(404).send({ message: 'Code mismatch' });
      }

      const updatequery = `UPDATE user_activation
          SET status = 1
          WHERE  user_id = $1 AND code = $2`;
      db.query(updatequery, [req.body.id, req.body.code]).then(result => res.status(200).send(true));
    });
  },

  login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // check if user exists
    const query = 'SELECT * FROM users WHERE email = $1';
    db.query(query, [req.body.email]).then((result) => {
      const authUser = result.rows[0];

      if (!authUser) {
        return res.status(400).send({ message: 'The user does not exists' });
      }

      const phash = authUser.password;

      if (!bcrypt.compareSync(req.body.password, phash)) {
        return res.status(400).send({ message: 'Password mismatch' });
      }

      const accessToken = jwt.sign({ id: authUser.id }, SECRET_KEY, {
        expiresIn,
      });
      res.status(200).send({ user: authUser, access_token: accessToken, expires_in: expiresIn });
    });
  },

  getRequests(req, res) {
    const query = 'SELECT * FROM rides_requests WHERE ride_id = $1';
    const values = [req.params.id];

    db.query(query, values).then((result) => {
      if (result.rows.length === 0) {
        return res.status(400).send({ message: 'You have not offered any rides yet' });
      }
      res.status(200).send({ data: result.rows });
    });
  },
};

export default User;
