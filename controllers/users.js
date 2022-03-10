const path = require('path');
const USERS_PATH = path.join(__dirname, '../data/users.json');
const readFile = require('../helpers/index');

const getUser = (req, res) => {
  readFile(USERS_PATH)
    .then(data => {
      const { id } = req.params;
      const user = data.find(user => user._id === id);

      if(!user) res.status(404).send({ errorMessage: "User ID not found" });
      else res.send(user);
    })
    .catch(() => res.status(500).send({ errorMessage: 'An error as occured on the server' }));
}

const getUsers = (req, res) => {
  readFile(USERS_PATH)
    .then(data => res.send(data))
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

module.exports = { getUser, getUsers }
