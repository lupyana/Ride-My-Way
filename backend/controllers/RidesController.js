import db from '../db/index';

const Ride = {
  create(req, res) {
    if (!req.body.from || !req.body.to || !req.body.with || !req.body.time) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const query = `INSERT INTO
      rides(ride_start, ride_to, ride_time, ride_with)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [req.body.from, req.body.to, req.body.time, req.body.with];

    db.query(query, values)
      .then(result => res.status(201).send({ message: 'Success: your offer has been published!' }))
      .catch(error => res.status(400).send(error));
  },

  getAll(req, res) {
    const query = 'SELECT * FROM rides';
    db.query(query)
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(400).send(error));
  },

  getOne(req, res) {
    const query = 'SELECT * FROM rides WHERE id::text = $1';
    const values = [req.params.id];
    db.query(query, values)
      .then((result) => {
        if (!result.rows[0]) {
          return res.status(404).send({ message: 'Ride not found' });
        }
        return res.status(200).json({ data: result.rows[0] });
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    const query = 'DELETE FROM rides WHERE id=$1 returning *';
    const values = [req.params.id];
    db.query(query, values)
      .then((result) => {
        if (!result.rows[0]) {
          return res.status(404).send({ message: 'Ride not found' });
        }
        return res.status(204).json({ message: 'Ride succesfully deleted' });
      })
      .catch(error => res.status(400).send(error));
  },

  request(req, res) {
    if (!req.body.user_id || !req.body.ride_id) {
      return res.status(400).send({ message: 'Invalid ids provided' });
    }

    const query = 'SELECT * FROM rides_requests WHERE user_id = $1 AND ride_id = $2';

    db.query(query, [req.body.user_id, req.body.ride_id])
      .then((result) => {
        if (result.rows[0]) {
          return res.status(400).send({ message: 'Your have already requested to join this ride' });
        }
        const query = 'INSERT INTO rides_requests (user_id, ride_id) VALUES ($1, $2)';
        db.query(query, [req.body.user_id, req.body.ride_id])
          .then((result) => {
            res.status(200).json({ message: 'Your request has been recieved' });
          })
          .catch(error => error);
      })
      .catch(error => error);
  },
};
export default Ride;
