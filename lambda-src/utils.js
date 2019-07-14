let headers = {};

if(process.env.LAMBDA_DEV === 'true') {
    headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers": "Content-Type"
    }
}

module.exports = {
    headers
}