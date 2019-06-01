import bcrypt from 'bcrypt';
import db from '../db/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = {
  register(req, res) {
    if ((!req.body.email && !req.body.password && !req.body.fname, !req.body.lname)) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const hash = bcrypt.hashSync(req.body.password, salt);
    const query = `INSERT INTO
      users(email, password, fname, lname)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [req.body.email, hash, req.body.fname, req.body.lname];

    db.query(query, values)
      .then(result => res.status(201).send({
        message:
            'We have sent a verification code to your email! Enter the code to complete the verification process',
      }))
      .catch(error => res.status(400).send(error));
  },
};

export default User;
