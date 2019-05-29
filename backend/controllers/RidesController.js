import moment from 'moment';
import uuidv4 from 'uuid/v4';
import RideModel from '../models/Ride';
import db from '../db/index';

const Ride = {
  create(req, res) {
    if ((!req.body.from && !req.body.to && !req.body.with, !req.body.time)) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const query = `INSERT INTO
      rides(id, ride_start, ride_to, ride_time, ride_with, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.from,
      req.body.to,
      req.body.time,
      req.body.with,
      moment(new Date()),
      moment(new Date()),
    ];

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
    const query = 'DELETE FROM reflections WHERE id=$1 returning *';
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
};
export default Ride;
