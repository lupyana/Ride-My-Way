"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// get an instance of the express Router
var authRoutes = _express["default"].Router();

authRoutes.use((0, _cors["default"])());
authRoutes.options('*', (0, _cors["default"])());
authRoutes.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
/**
 * @swagger
 *
 * /api/vi/register:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Add a new user"
 *     description: register user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fname
 *         description: User's first name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lname
 *         description: User's last name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User has been registerd, code sent to email for verification
 *       400:
 *         description: Missing parameters
 */

authRoutes.post('/auth/register', _UserController["default"].register);
/**
 * @swagger
 *
 * /api/vi/verify:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Verify registered user"
 *     description: verify registerd user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: code
 *         description: Code sent via email.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: user_id
 *         description: User's id.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User redirected to login screen
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: Token mismatch
 */

authRoutes.post('/auth/verify', _UserController["default"].verify);
/**
 * @swagger
 *
 * /api/vi/login:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "User login"
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Users email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:  User is authenticated, provided jwt token to be uses in all future requests and user object is returned
 *       400:
 *           description: User doesnot exist or password mismatch
 */

authRoutes.post('/auth/login', _UserController["default"].login);
var _default = authRoutes;
exports["default"] = _default;