const path = require('path');
const CARDS_PATH = path.join(__dirname, '../data/cards.json');
const fs = require('fs').promises;

const getCards = (req, res) => {
  fs.readFile(CARDS_PATH, { encoding: 'utf8' })
    .then(data => {
      const cardsData = JSON.parse(data);
      res.send(cardsData);
    })
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

module.exports = getCards;