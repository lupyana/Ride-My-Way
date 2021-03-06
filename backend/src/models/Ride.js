class Ride {
  constructor() {
    this.rides = [
      {
        id: 1,
        from: 'Upanga',
        to: 'Buguruni',
        with: 'Not Joe',
        time: '1200',
      },
      {
        id: 2,
        from: 'Masaki',
        to: 'Mbezi',
        with: 'Anovic',
        time: '1300',
      },
      {
        id: 3,
        from: 'Masaki',
        to: 'Victoria',
        with: 'Kevin Joe',
        time: '1300',
      },
      {
        id: 4,
        from: 'Bamaga',
        to: 'Mbezi',
        with: 'Ben Teyga',
        time: '1800',
      },
    ];
  }

  create(data) {
    const newRide = {
      from: data.from,
      to: data.to,
      with: data.with,
      time: data.time,
    };
    this.rides.push(newRide);
    return newRide;
  }

  findAll() {
    return this.rides;
  }

  findOne(id) {
    return this.rides.find(ride => ride.id == id);
  }

  delete(id) {
    const ride = this.findOne(id);
    const index = this.rides.indexOf(ride);
    this.rides.splice(index, 1);
    return {};
  }
}

export default new Ride();
