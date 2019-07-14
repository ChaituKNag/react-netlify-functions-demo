const API_PATH = (
    process.env.NODE_ENV === 'development' 
        ? 'http://localhost:9000/.netlify/functions' 
        : '/.netlify/functions'
);

module.exports = {
    API_PATH
}