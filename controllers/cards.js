const Card = require('../models/cards');

const getCards = (req, res) => {
  Card.find({})
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
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