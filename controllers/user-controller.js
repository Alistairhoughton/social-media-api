const { User, Thought } = require('../models');

// ---------------------------- get all users

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get single user by id

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

};

module.exports = userController;













