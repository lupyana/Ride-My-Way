import bcrypt from 'bcrypt';
import db from '../db/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = {
  register(req, res) {
    if (!req.body.email || !req.body.password || !req.body.fname || !req.body.lname) {
      return res.status(400).send({ message: 'All fields are required' });
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
};

export default User;
