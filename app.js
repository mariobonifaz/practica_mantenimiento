"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const TaskController_1 = require("./task/infrastructure/controllers/TaskController");
const PostegresTaskRepository_1 = require("./task/infrastructure/repositorios/PostegresTaskRepository");
const TaskService_1 = require("./task/application/services/uses-cases/TaskService");
const app = (0, express_1.default)();
const PORT = 3000;
// Dependency Injection
const taskRepository = new PostegresTaskRepository_1.PostgresUserRepository();
const taskService = new TaskService_1.TaskService(taskRepository);
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.post('/task/register', (req, res) => (0, TaskController_1.registerTask)(req, res, taskRepository, taskService));
app.put('/task/:id', (req, res) => (0, TaskController_1.updateTask)(req, res, taskRepository, taskService)); // Agrega la ruta para actualizar un usuario
app.delete('/task/:id', (req, res) => (0, TaskController_1.deleteTask)(req, res, taskRepository, taskService)); // Agrega esta línea
app.get('/task', (req, res) => (0, TaskController_1.getAllTask)(req, res, taskRepository, taskService));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
