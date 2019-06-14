"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _routes = _interopRequireDefault(require("./router/routes"));

var _auth = _interopRequireDefault(require("./router/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3001;
var options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Ride My Way',
      version: '1.0.0',
      description: 'API documentation for ridemyway, Curtesy of ALC, ForloopTanzania',
      contact: {
        name: 'Lupyana Mbembati',
        email: 'lupyanambembati@gmail.com'
      }
    },
    basePath: '/api-docs'
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./router/*.js']
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(options);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
app.use('/api/v1', _auth["default"]);
app.use('/api/v1', _routes["default"]);
var _default = app;
exports["default"] = _default;
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});