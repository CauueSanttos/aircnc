import Booking from '../models/Booking';

class BookingController {
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

    const ownerSocket = req.connectedUsers[newBooking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', newBooking);
    }

    return res.json(newBooking);
  }
};

export default new BookingController();
