const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const OngController = require('./controllers/OngController');

const connection = require('./database/connection');

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);


app.listen(3333);
