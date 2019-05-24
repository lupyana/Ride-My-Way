const express = require('express');

const router = express.Router(); // get an instance of the express Router

const rides = [
  {
    from: 'Upanga',
    to: 'Buguruni',
    with: 'Not Joe',
    time: '1200',
  },
  {
    from: 'Masaki',
    to: 'Mbezi',
    with: 'Anovic',
    time: '1300',
  },
  {
    from: 'Masaki',
    to: 'Victoria',
    with: 'Kevin Joe',
    time: '1300',
  },
  {
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
