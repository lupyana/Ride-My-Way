"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ride =
/*#__PURE__*/
function () {
  function Ride() {
    _classCallCheck(this, Ride);

    this.rides = [{
      id: 1,
      from: 'Upanga',
      to: 'Buguruni',
      "with": 'Not Joe',
      time: '1200'
    }, {
      id: 2,
      from: 'Masaki',
      to: 'Mbezi',
      "with": 'Anovic',
      time: '1300'
    }, {
      id: 3,
      from: 'Masaki',
      to: 'Victoria',
      "with": 'Kevin Joe',
      time: '1300'
    }, {
      id: 4,
      from: 'Bamaga',
      to: 'Mbezi',
      "with": 'Ben Teyga',
      time: '1800'
    }];
  }

  _createClass(Ride, [{
    key: "create",
    value: function create(data) {
      var newRide = {
        from: data.from,
        to: data.to,
        "with": data["with"],
        time: data.time
      };
      this.rides.push(newRide);
      return newRide;
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return this.rides;
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      return this.rides.find(function (ride) {
        return ride.id == id;
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var ride = this.findOne(id);
      var index = this.rides.indexOf(ride);
      this.rides.splice(index, 1);
      return {};
    }
  }]);

  return Ride;
}();

var _default = new Ride();

exports["default"] = _default;