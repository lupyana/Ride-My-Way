import express from 'express';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import router from './router/routes';
import authRoutes from './router/auth';

const app = express();
const port = 3000;

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Ride My Way',
      version: '1.0.0',
      description: 'API documentation for ridemyway, Curtesy of ALC, ForloopTanzania',
      contact: {
        name: 'Lupyana Mbembati',
        email: 'lupyanambembati@gmail.com',
      },
    },
    basePath: '/api-docs',
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', authRoutes);
app.use('/api/v1', router);

export default app;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
