const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/routes');

const app = express();
const port = 3000;

app.use('/api/v1', router);

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

module.exports = app;

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
