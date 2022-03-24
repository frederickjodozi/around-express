const User = require('../models/user');

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      const err = new Error('The resource couldn\'t be found');
      err.name = "UnavailableResource";
      throw err;
    })
    .then(user => res.send(user))
    .catch((err) => {
      if(err.name === "UnavailableResource") {
        res.status(404).send({ Error: `${ err.message }` });
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' });
      }
    });
}

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const err = new Error('The resource couldn\'t be found');
      err.name = "UnavailableResource";
      throw err;
    })
    .then(users => res.send(users))
    .catch((err) => {
      if(err.name === "UnavailableResource") {
        res.status(400).send({ Error: `${ err.message }` });
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' });
      }
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(data => res.send(data))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({ Error: `${ err.name }` });
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' });
      }
    });
}

module.exports = { getUser, getUsers, createUser }
