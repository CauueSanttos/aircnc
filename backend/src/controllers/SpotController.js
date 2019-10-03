const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id: user } = req.headers;

    const findUser = await User.findById(user);

    if (!findUser) {
      return res.status(400).json({ error: 'User does not exists!' });
    }

    const newSpot = await Spot.create({
      user,
      thumbnail: filename,
      techs: techs.split(',').map(tech => tech.trim()),
      price,
      company
    });

    return res.json(newSpot);
  },
};
