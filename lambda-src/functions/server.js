
require('dotenv').config();

const express = require('express');
const cors = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const todosRouter = require('../routes/todos.route');

const app = express();

app.use(cors());
app.use(express.json());

const mongoDBUri = process.env.MLAB_URI;

mongoose.connect(mongoDBUri, {
    useNewUrlParser: true,
    useCreateIndex  : true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected successfully');
})

app.use('*', (req, res, next) => {
    if(process.env.LAMBDA_DEV) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    }
    next();
})

app.use('/.netlify/functions/server/todos', todosRouter);

exports.handler = serverless(app);