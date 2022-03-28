const User = require('../models/user');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500, } = require('../utils/errorStatusCodes');

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      const err = new Error('The resource couldn\'t be found');
      err.name = 'UnavailableResource';
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'UnavailableResource') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.updateOne({ name, about })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.updateOne({ avatar })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
