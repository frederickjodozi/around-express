const path = require('path');
const CARDS_PATH = path.join(__dirname, '../data/cards.json');
const readFile = require('../helpers/index');

const getCards = (req, res) => {
  readFile(CARDS_PATH)
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

module.exports = getCards;