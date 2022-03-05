const express = require('express');
const app = express();

//const routes = require('./routes');
const { PORT = 3000 } = process.env;

//app.use(routes);
app.listen(PORT, () => console.log(`We're live on ${PORT}!`));

