const express = require('express');
const app = express();

const { PORT = 3000 } = process.env;
const routes = require('./routes');

app.use(routes);
app.listen(PORT, () => console.log(`We're live on ${PORT}!`));

