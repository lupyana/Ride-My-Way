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

  findAll() {
    return this.rides;
  }

  findOne(id) {
    return this.rides.find(ride => ride.id == id);
  }
}

module.exports = new Ride();
