const Card = require('../models/card');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500, } = require('../utils/errorStatusCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.parms.cardId

  Card.findByIdAndDelete(cardId)
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ Error: `${err.name}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
    } else if (err.name === 'CastError') {
      res.status(ERROR_CODE_404).send({ Error: `${err.name}` });
    } else {
      res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
    }
  });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ Error: `${err.name}` });
    } else if (err.name === 'CastError') {
      res.status(ERROR_CODE_404).send({ Error: `${err.name}` });
    } else {
      res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
    }
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
 };
