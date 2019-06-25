"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Ride = {
  create: function create(req, res) {
    if (!req.body.from || !req.body.to || !req.body["with"] || !req.body.time) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var query = "INSERT INTO\n      rides(ride_start, ride_to, ride_time, ride_with)\n      VALUES($1, $2, $3, $4)\n      returning *";
    var values = [req.body.from, req.body.to, req.body.time, req.body["with"]];

    _index["default"].query(query, values).then(function (result) {
      return res.status(201).send({
        message: 'Success: your offer has been published!'
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  },
  getAll: function getAll(req, res) {
    var query = 'SELECT * FROM rides INNER JOIN users ON (rides.ride_with = users.id)';

    _index["default"].query(query).then(function (result) {
      return res.status(200).json({
        data: result.rows
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  },
  getOne: function getOne(req, res) {
    var query = 'SELECT * FROM rides WHERE id::text = $1';
    var values = [req.params.id];

    _index["default"].query(query, values).then(function (result) {
      if (!result.rows[0]) {
        return res.status(404).send({
          message: 'Ride not found'
        });
      }

      return res.status(200).json({
        data: result.rows[0]
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  },
  "delete": function _delete(req, res) {
    var query = 'DELETE FROM rides WHERE id=$1 returning *';
    var values = [req.params.id];

    _index["default"].query(query, values).then(function (result) {
      if (!result.rows[0]) {
        return res.status(404).send({
          message: 'Ride not found'
        });
      }

      return res.status(204).json({
        message: 'Ride succesfully deleted'
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  },
  request: function request(req, res) {
    if (!req.body.user_id || !req.body.ride_id) {
      return res.status(400).send({
        message: 'Invalid ids provided'
      });
    }

    var query = 'SELECT * FROM rides_requests WHERE user_id = $1 AND ride_id = $2';

    _index["default"].query(query, [req.body.user_id, req.body.ride_id]).then(function (result) {
      if (result.rows[0]) {
        return res.status(400).send({
          message: 'Your have already requested to join this ride'
        });
      }

      var query = 'INSERT INTO rides_requests (user_id, ride_id) VALUES ($1, $2)';

      _index["default"].query(query, [req.body.user_id, req.body.ride_id]).then(function (result) {
        res.status(200).json({
          message: 'Your request has been recieved'
        });
      })["catch"](function (error) {
        return error;
      });
    })["catch"](function (error) {
      return error;
    });
  }
};
var _default = Ride;
exports["default"] = _default;