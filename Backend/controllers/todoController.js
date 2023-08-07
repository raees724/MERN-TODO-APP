import { todoUpdatevalidator } from "../helpers/todoUpdateValidator.js";
import { validateTodo } from "../helpers/todoValidator.js";
import { Todo } from "../models/Todo.js";


export const getTodos = (async (req, res) => {
    try {
        const user = req.userId;
        const { page = 1, limit = 10 } = req.query;
        const today = new Date();
        const formattedDate = today.toDateString();
        console.log(formattedDate)
      
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        };
      
    
        const todos = await Todo.paginate({ userId: user, isCompleted: false }, options);
        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export const createTodo = ((req, res) => {
    try {
        const user = req.userId;
        const { error, value } = validateTodo(req.body);

        if (error) {
            res.status(422).json(error.details[0]?.message)
        } else {
            const newTodo = new Todo({
                title: value?.title,
                description: value?.description,
                date: value?.date,
                userId: user
            });

            newTodo.save();
        }
        res.status(201).json({ success: 'todo created successfully' })

    } catch (error) {
        res.status(500).json({ error: 'unauthorized user' });

    }
});

export const updateTodos = (async (req, res) => {
    try {
        const user = req.userId;
        const { error, value } = todoUpdatevalidator(req.body);
        console.log(value)

        if (error) {
            res.status(422).json(error.details[0]?.message)
        } else {
            const updateTodo = await Todo.updateOne({ _id: value?.id }, value);
        }

        res.status(200).json({ success: 'data updated successfully' });

    } catch (error) {
        res.status(500).json(error)

    }
});

export const deleteTodo = (async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const deleteTodo = await Todo.findByIdAndRemove(id);
        res.status(200).json({ success: 'todo deleted successfully' })

    } catch (error) {
        res.status(500).json(error)

    }
})

export const getCompletedTodos = (async (req, res) => {
    const user = req.userId
    const completedTodos = await Todo.find({ isCompleted: true, userId: user });
    res.status(201).json(completedTodos)
});

export const incompletedTodos = (async (req, res) => {
    const user = req.userId
    const incompleted = await Todo.find({ isCompleted: false, userId: user });
    res.status(201).json(incompleted);
});


