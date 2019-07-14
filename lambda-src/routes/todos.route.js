const router = require('express').Router();
const Todo = require('../models/todo.model');
const { genericErrorCatch } = require('../utils');

router.get('/', async (req, res) => {
    const todos = await Todo.find().catch(err => genericErrorCatch(err, res));
    res.status(200).json(todos);
});

router.post('/', async (req, res) => {
    const { title, description = '', date, username, completed = false} = req.body;

    const newTodo = new Todo({
        title, description, username, date: new Date(date), completed
    });

    await newTodo.save().catch(err => genericErrorCatch(err, res));

    res.status(200).json("Todo saved!");
})

router.post('/:id', async (req, res) => {
    const { completed } = req.body;

    await Todo.findByIdAndUpdate(req.params.id, {completed}).catch(err => genericErrorCatch(err, res));

    res.status(200).json("Todo updated!");
    
});

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id).catch(err => genericErrorCatch(err, res));

    res.status(200).json('Todo deleted!');
})

module.exports = router;