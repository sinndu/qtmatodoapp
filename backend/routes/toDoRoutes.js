import express from 'express';
import { toDo } from '../models/todoModel.js';

const router = express.Router();

router.post('/', async (request, response) => { //Route for saving book
    try {
        if (
            !request.body.title //Validate request body
        ) {
            return response.status(400).send({
                message: 'send all rq fields: title',
            });
        }
        const newToDo = {
            title: request.body.title, //Making new instance
        };
        
        //Save to database
        const todo = await toDo.create(newToDo);
        return response.status(201).send(todo);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});

//getting book
router.get('/', async (request, response) => {
    try {
        const todo = await toDo.find({});

        return response.status(200).json(
            {
                data: todo
            });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//deleting book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const todo = await toDo.findByIdAndDelete(id);
        if (!todo) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'successfully deleted book' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

export default router;