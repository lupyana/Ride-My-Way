"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var saltRounds = 10;

var salt = _bcrypt["default"].genSaltSync(saltRounds);

var SECRET_KEY = 'secretkey23456';
var expiresIn = 24 * 60 * 60;
var User = {
  register: function register(req, res) {
    if (!req.body.email || !req.body.password || !req.body.fname || !req.body.lname) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    } // Check if existing


    var query = 'SELECT * FROM users WHERE email = $1';

    _index["default"].query(query, [req.body.email]).then(function (result) {
      if (result.rows.length > 0) {
        return res.status(400).send({
          message: 'Email already exists'
        });
      }

      var hash = _bcrypt["default"].hashSync(req.body.password, salt);

      var query = "INSERT INTO\n          users(email, password, fname, lname)\n          VALUES($1, $2, $3, $4)\n          returning id";
      var values = [req.body.email, hash, req.body.fname, req.body.lname];
      var query2 = "INSERT INTO\n          user_activation(user_id, code)\n          VALUES($1, $2)\n          returning *";
      var code = Math.floor(Math.random() * 90000) + 10000;

      _index["default"].query(query, values).then(function (result) {
        _index["default"].query(query2, [result.rows[0].id, code]).then(function (result) {
          return res.status(201).send({
            code: code,
            message: 'We have sent a verification code to your email! Enter the code to complete the verification process'
          });
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  },
  verify: function verify(req, res) {
    if (!req.body.id || !req.body.code) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var query = 'SELECT * FROM user_activation WHERE user_id = $1 AND code = $2';

    _index["default"].query(query, [req.body.id, req.body.code]).then(function (result) {
      if (!result.rows[0]) {
        return res.status(404).send({
          message: 'Code mismatch'
        });
      }

      var updatequery = "UPDATE user_activation\n          SET status = 1\n          WHERE  user_id = $1 AND code = $2";

      _index["default"].query(updatequery, [req.body.id, req.body.code]).then(function (result) {
        return res.status(200).send(true);
      });
    });
  },
  login: function login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    } // check if user exists


    var query = 'SELECT * FROM users WHERE email = $1';

    _index["default"].query(query, [req.body.email]).then(function (result) {
      var authUser = result.rows[0];

      if (!authUser) {
        return res.status(400).send({
          message: 'The user does not exists'
        });
      }

      var phash = authUser.password;

      if (!_bcrypt["default"].compareSync(req.body.password, phash)) {
        return res.status(400).send({
          message: 'Password mismatch'
        });
      }

      var accessToken = _jsonwebtoken["default"].sign({
        id: authUser.id
      }, SECRET_KEY, {
        expiresIn: expiresIn
      });

      res.status(200).send({
        user: authUser,
        access_token: accessToken,
        expires_in: expiresIn
      });
    })["catch"](function (error) {
      return error;
    });
  },
  getRequests: function getRequests(req, res) {
    var query = 'SELECT * FROM rides_requests INNER JOIN rides ON (rides_requests.ride_id = rides.id) WHERE user_id = $1';
    var values = [req.params.id];

    _index["default"].query(query, values).then(function (result) {
      if (result.rows.length === 0) {
        return res.status(200).send({
          message: 'You have not requested any rides yet',
          data: []
        });
      }

      res.status(200).send({
        data: result.rows
      });
    });
  },
  getOffers: function getOffers(req, res) {
    var query = 'SELECT * FROM rides_requests LEFT JOIN rides ON (rides_requests.ride_id = rides.id) WHERE rides.ride_with = $1';
    var values = [req.params.id];

    _index["default"].query(query, values).then(function (result) {
      if (result.rows.length === 0) {
        return res.status(200).send({
          message: 'You have not offered any rides yet',
          data: []
        });
      }

      res.status(200).send({
        data: result.rows
      });
    });
  },
  getHistory: function getHistory(req, res) {
    var query = 'SELECT * FROM rides_requests INNER JOIN rides ON (rides_requests.ride_id = rides.id) WHERE (rides_requests.status = $1 AND rides_requests.user_id = $2)';
    var values = [1, req.params.user_id];

    _index["default"].query(query, values).then(function (result) {
      if (result.rows.length === 0) {
        return res.status(200).send({
          message: 'Nothing to see here',
          data: []
        });
      }

      res.status(200).send({
        data: result.rows
      });
    });
  },
  replyRequests: function replyRequests(req, res) {
    var query = 'SELECT * FROM rides_requests WHERE ride_id = $1 AND id = $2';
    var values = [req.params.ride_id, req.params.request_id];

    _index["default"].query(query, values).then(function (result) {
      if (result.rows.length === 0) {
        return res.status(400).send({
          message: 'Ride does not exist'
        });
      }

      _index["default"].query('UPDATE rides_requests SET status = 1 WHERE  ride_id = $1 AND id = $2', values).then(function (result) {
        return res.status(200).send('true');
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    })["catch"](function (error) {
      return error;
    });
  }
};
var _default = User;
exports["default"] = _default;