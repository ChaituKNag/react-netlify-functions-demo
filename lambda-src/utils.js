let headers = {};

if(process.env.LAMBDA_DEV === 'true') {
    headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers": "Content-Type"
    }
}

const genericErrorCatch = (err, res) => {
    res.status(400).json(err);
}

module.exports = {
    headers,
    genericErrorCatch
}