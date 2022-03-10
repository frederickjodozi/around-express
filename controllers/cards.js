const path = require('path');
const CARDS_PATH = path.join(__dirname, '../data/cards.json');
const fs = require('fs');

const getCards = (req, res) => {
  fs.readFile(CARDS_PATH, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      res.send(err);
      return
    }
    const cardsData = JSON.parse(data);
    res.send(cardsData);
  });
}

module.exports = getCards;