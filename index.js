const express = require('express');
const cors = require('cors');

const routes = require('./routes/register/index.js'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Starting module 'server' running at: http://localhost:8081");
