const User = require('../models/user');

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if(!user) res.status(404).send({ errorMessage: "User ID not found" });
      else res.send(user);
    })
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

const getUsers = (req, res) => {
  User.find({})
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

module.exports = { getUser, getUsers, createUser }
