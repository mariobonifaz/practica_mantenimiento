// app.ts
import express from "express";
import bodyParser from 'body-parser';
import { registerTask,updateTask, deleteTask, getAllTask } from "./task/infrastructure/controllers/TaskController";
import { PostgresUserRepository as PostgresTaskRepository } from "./task/infrastructure/repositorios/PostegresTaskRepository";
import { TaskService } from "./task/application/services/uses-cases/TaskService";


const app = express();
const PORT = 3000;

// Dependency Injection
const taskRepository = new PostgresTaskRepository();
const taskService = new TaskService(taskRepository);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/task/register', (req, res) => registerTask(req, res, taskRepository, taskService));
app.put('/task/:id', (req, res) => updateTask(req, res, taskRepository, taskService)); // Agrega la ruta para actualizar un usuario
app.delete('/task/:id', (req, res) => deleteTask(req, res, taskRepository, taskService)); // Agrega esta línea
app.get('/task', (req, res) => getAllTask(req, res, taskRepository, taskService));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

