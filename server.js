import express from "express";
import mongoose from "mongoose";
import * as UserController from './controllers/UserController.js';
import * as GroupController from './controllers/GroupConroller.js';
import * as WorkerController from './controllers/WorkerController.js';
import cors from "cors";
import { checkAuth } from "./utils/checkAuth.js";

mongoose
.connect('mongodb+srv://kharlamov39:eden@cluster0.lgvw0dz.mongodb.net/workers?retryWrites=true&w=majority')
.then( () => console.log('DB connect'))
.catch( (err) => console.log('DB error', err))

const app = express();
app.use(express.json());
app.use(cors());


app.post('/auth/register', UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.authMe);

app.get('/group', checkAuth, GroupController.getGroups);
app.post('/group', checkAuth, GroupController.createGroup);
app.delete('/group/:groupId', checkAuth, GroupController.deleteGroup);

app.get('/worker/:groupId', checkAuth, WorkerController.getWorkers);
app.post('/worker/:groupId', checkAuth, WorkerController.createWorker);
app.patch('/worker/:workerId', checkAuth, WorkerController.editWorker);
app.delete('/worker/:workerId', checkAuth, WorkerController.deleteWorker);

app.listen(4001, (err) => {
    if(err) {
        return console.log(err)
    } 
    console.log('Server OK!')
})