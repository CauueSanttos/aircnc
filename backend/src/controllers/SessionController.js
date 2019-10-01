const User = require('../models/User');

module.exports = {
    store(req, res) {
        return res.json({ message: 'Hello World' })
    }
};