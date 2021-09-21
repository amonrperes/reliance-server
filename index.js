require('dotenv/config');
const configDefaults = process.env;

const express = require('express');
const cors = require('cors');

const routes = require('./routes/register/index.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(configDefaults.DEFAULT_PORT, () => console.log(configDefaults.DEFAULT_SERVER_STARTING_MESSAGE));
