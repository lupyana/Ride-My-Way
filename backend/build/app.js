Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _bodyParser = _interopRequireDefault(require('body-parser'));

const _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'));

const _swaggerJsdoc = _interopRequireDefault(require('swagger-jsdoc'));

const _routes = _interopRequireDefault(require('./router/routes'));

const _auth = _interopRequireDefault(require('./router/auth'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express.default)();
const port = 3001;
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
const swaggerSpec = (0, _swaggerJsdoc.default)(options);
app.use(_bodyParser.default.json());
app.use(
  _bodyParser.default.urlencoded({
    extended: false,
  }),
);
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpec));
app.use('/api/v1', _auth.default);
app.use('/api/v1', _routes.default);
const _default = app;
exports.default = _default;
app.listen(port, () => console.log('Example app listening on port '.concat(port, '!')));
