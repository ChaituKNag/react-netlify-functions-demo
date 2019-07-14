
require('dotenv').config();

const express = require('express');
const cors = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const todosRouter = require('../routes/todos.route');

const app = express();

app.use(cors());
app.use(express.json());

// const mongoDBUri = process.env.MLAB_URI;
const mongoDBUri = 'mongodb://kncdbuser:Password1234@ds123658.mlab.com:23658/react-netlify-functions-demo';
console.log('mongoDBUri', mongoDBUri);

mongoose.connect(mongoDBUri, {
    useNewUrlParser: true,
    useCreateIndex  : true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected successfully');
})

if(process.env.LAMBDA_DEV) {
    app.use('*', (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        next();
    })
}

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).json({
      user:'Chaitu'
  })
});

app.use('/.netlify/functions/server', router);
app.use('/.netlify/functions/server/todos', todosRouter);

exports.handler = serverless(app);