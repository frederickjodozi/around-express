const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const err = new Error('The resource couldn\'t be found');
      err.name = "UnavailableResource";
      throw err;
    })
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === "UnavailableResource") {
        res.status(404).send({ Error: `${ err.message }` });
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' });
      }
    });
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId})
    .then(card => res.send(card))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({ Error: `${ err.name }` })
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' })
      }
    });
}

const deleteCard = (req, res) => {
  const { id } = req.body;

  Card.deleteOne(id)
    .orFail(() => {
      const err = new Error('The resource couldn\'t be found');
      err.name = "UnavailableResource";
      throw err;
    })
    .then(data => res.send(data))
    .catch((err) => {
      if(err.name === "UnavailableResource") {
        res.status(404).send({ Error: `${ err.message }` });
      } else {
        res.status(500).send({ Error: 'An error as occured on the server' });
      }
    });
}

module.exports = { getCards, createCard, deleteCard };