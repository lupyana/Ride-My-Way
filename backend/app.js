import express from 'express';
// const express = require('express');
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';

import router from './router/routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);

export default app;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
