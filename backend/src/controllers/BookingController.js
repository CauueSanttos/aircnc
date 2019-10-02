const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { user_id: user } = req.headers;
    const { spot_id: spot } = req.params;
    const { date } = req.body;

    const newBooking = await Booking.create({
      user,
      spot,
      date,
    });

    await newBooking
      .populate('spot')
      .populate('user')
      .execPopulate();

    return res.json(newBooking);
  },
};
