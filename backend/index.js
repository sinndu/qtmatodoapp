import express from "express";
import { mongoDbURL, PORT } from "./config.js";
import mongoose from 'mongoose';
import todosRoute from "./routes/toDoRoutes.js";
import cors from 'cors';

app.use(cors());
const app = express(); //create app server

app.use(express.json()); //parsing the request body

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello world!!")
  });

mongoose.connect(mongoDbURL) //Connect to the database
    .then(()=> {
        console.log('App connected to database!!!');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log(error);
});

app.use('/api/todos', todosRoute); //Tell app to use todoroute rotuer when path starts with api/todos