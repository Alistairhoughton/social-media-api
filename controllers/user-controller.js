const { User, Thought } = require("../models");

// ----------------------------------------------------------- get all users

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // ------------------------------------------------------ get single user by id

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // --------------------------------------------------------------------- create a new user

  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // -------------------------------------------------------------------- update user

  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete user --------------------------------------------------

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
      })
      .then(() => {
        res.json({ message: "user has been deleted." });
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
