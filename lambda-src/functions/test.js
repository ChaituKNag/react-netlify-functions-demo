
require('dotenv').config();

const express = require('express');
const cors = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

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
      user:'Chaitanya'
  })
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use('/.netlify/functions/test', router); 

exports.handler = serverless(app);