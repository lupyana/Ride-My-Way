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

router.get('/rides', (req, res) => {
  res.status(200).json({ rides });
});

module.exports = router;
