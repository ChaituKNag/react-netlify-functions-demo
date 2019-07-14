const {Schema, model} = require('mongoose');

const Todo = model('Todo', new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false},
    date: { type: Date, required: true },
    username: { type: String, required: true },
    completed: { type: Boolean, required: true}
}));

module.exports = Todo;