const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const routes = require('./routes/index');
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  }
  next();
});

app.use(routes);
app.listen(PORT, () => console.log(`We're live on ${PORT}!`));

