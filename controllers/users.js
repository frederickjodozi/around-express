const path = require('path');
const USERS_PATH = path.join(__dirname, '../data/users.json')
const fs = require('fs');

const getUser = (req, res) => {
  fs.readFile(USERS_PATH, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      res.send(err)
      return
    }
    const { id } = req.params;
    const userData = JSON.parse(data);
    const user = userData.find((user) => user._id === id);
    if(!user) {
      res.status(404).send({ message: "User ID not found" });
    }
    res.send(user);
  });
}

const getUsers = (req, res) => {
  fs.readFile(USERS_PATH, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      res.send(err);
      return
    }
    const usersData = JSON.parse(data);
    res.send(usersData);
  });
}

module.exports = { getUser, getUsers }
