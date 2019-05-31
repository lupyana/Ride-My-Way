import uuidv4 from 'uuid/v4';
import moment from 'moment';

const User = {
  register(req, res) {
    if ((!req.body.email && !req.body.password && !req.body.fname, !req.body.lname)) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const query = `INSERT INTO
      users(id, email, password, fname, lname)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.password,
      req.body.fname,
      req.body.lname,
      moment(new Date()),
      moment(new Date()),
    ];
    res.status(201).send({
      message:
        'We have sent a verification code to your email! Enter the code to complete the verification process',
    });
  },
};

export default User;
