const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(8080, () => console.log('server running on port 8080'));