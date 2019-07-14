const {Schema, model} = require('mongoose');

const User = model('User', new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}));

module.exports = User;