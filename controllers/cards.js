const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId})
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

const deleteCard = (req, res) => {
  const { id } = req.body;

  Card.deleteOne(id)
  .then(data => res.send(data))
  .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

module.exports = { getCards, createCard, deleteCard };