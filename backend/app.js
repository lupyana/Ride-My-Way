const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);
module.exports = app;

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
