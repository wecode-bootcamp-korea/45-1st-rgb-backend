require("dotenv").config();

const logger = require('morgan');
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function (req, res, next) {
    res.status(200).json({ message: 'pong' })
});

const PORT = process.env.PORT;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`🚨 server listening on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();