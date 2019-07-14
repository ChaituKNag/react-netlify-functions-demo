
require('dotenv').config();

const {headers} = require('../utils');

exports.handler = function(event, context, callback) {

    console.log('headers', headers);

    callback(null, {
    statusCode: 200,
    body: JSON.stringify({
        hello: 'world',
    }),
    headers
    });
}