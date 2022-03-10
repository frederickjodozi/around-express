const path = require('path');
const USERS_PATH = path.join(__dirname, '../data/users.json')
const fs = require('fs').promises;

const getUser = (req, res) => {
  fs.readFile(USERS_PATH, { encoding: 'utf8' })
    .then(data => {
      const { id } = req.params;
      const userData = JSON.parse(data);
      const user = userData.find(user => user._id === id);

      if(!user) res.status(404).send({ message: "User ID not found" });
      else res.send(user);
    })
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

const getUsers = (req, res) => {
  fs.readFile(USERS_PATH, { encoding: 'utf8' })
    .then(data => {
      const usersData = JSON.parse(data);
      res.send(usersData);
    })
    .catch(() => res.status(500).send({ Message: 'An error as occured on the server' }));
}

module.exports = { getUser, getUsers }
