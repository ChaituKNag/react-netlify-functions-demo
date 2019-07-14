const API_PATH = (
    process.env.NODE_ENV === 'development' 
        ? 'http://localhost:9000/.netlify/functions/server' 
        : '/.netlify/functions/server'
);

module.exports = {
    API_PATH
}