import Spot from '../models/Spot';

class DashboardController {
  async show(req, res) {
    const { user_id: user } = req.headers;

    const spots = await Spot.find({ user });

    return res.json(spots);
  }
};

export default new DashboardController();
