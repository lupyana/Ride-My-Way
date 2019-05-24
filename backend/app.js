const express = require('express');

const app = express();
const port = 3000;
const router = express.Router(); // get an instance of the express Router
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

app.use('/', router);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
