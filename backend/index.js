const express = require('express');

const app = express();
const port = 3000;
const router = express.Router(); // get an instance of the express Router
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
