const { User, Thought } = require('../models');

// ---------------------------- get all users

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // -------------------------------------------------

    // get single user by id
    
  };

  module.exports = userController;













