import RideModel from '../models/Ride';
import db from '../db/index';

const Ride = {
  create(req, res) {
    // return req.body;
    if ((!req.body.from && !req.body.to && !req.body.with, !req.body.time)) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const ride = RideModel.create(req.body);
    return res.status(201).send(ride);
  },

  getAll(req, res) {
    const findAllQuery = 'SELECT * FROM rides';
    db.query(findAllQuery)
      .then((result) => {
        console.log(result.rows);
        res.status(200).json({ data: result.rows });
      })
      .catch(error => res.status(400).send(error));
  },

  getOne(req, res) {
    const ride = RideModel.findOne(req.params.id);
    if (!ride) {
      return res.status(404).send({ message: 'Ride not found' });
    }
    return res.status(200).send({ ride });
  },

  delete(req, res) {
    const ride = RideModel.findOne(req.params.id);
    if (!ride) {
      return res.status(404).send({ message: 'ride not found' });
    }
    const ref = RideModel.delete(req.params.id);
    return res.status(204).send(ref);
  },
};
export default Ride;
