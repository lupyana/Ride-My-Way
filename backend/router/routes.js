const express = require('express');

const router = express.Router(); // get an instance of the express Router

const rides = [
  {
    id: 1,
    from: 'Upanga',
    to: 'Buguruni',
    with: 'Not Joe',
    time: '1200',
  },
  {
    id: 2,
    from: 'Masaki',
    to: 'Mbezi',
    with: 'Anovic',
    time: '1300',
  },
  {
    id: 3,
    from: 'Masaki',
    to: 'Victoria',
    with: 'Kevin Joe',
    time: '1300',
  },
  {
    id: 4,
    from: 'Bamaga',
    to: 'Mbezi',
    with: 'Ben Teyga',
    time: '1800',
  },
];

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});
router.post('/', (req, res) => {
  res.send('Got a POST request');
});

router.get('/rides', (req, res) => {
  res.status(200).json({ rides });
});

router.post('/rides', (req, res) => {
  rides.push(req.body.newRide);
  res.status(200).json({ rides });
});

router.get('/rides/:id', (req, res) => {
  res.status(200).json({ ride: rides[req.params.id] });
});

module.exports = router;
