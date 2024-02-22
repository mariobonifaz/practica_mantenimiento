"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTask = exports.deleteTask = exports.updateTask = exports.registerTask = void 0;
const registerTask = (req, res, taskRepository, taskService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield taskService.createTask(req.body);
        res.status(201).json(newTask);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.registerTask = registerTask;
const updateTask = (req, res, taskRepository, taskService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id; // Suponiendo que el id del usuario está en los parámetros de la solicitud
        const updatedUser = yield taskService.updateTask(taskId, req.body); // Llama al método de actualización del servicio de usuarios
        res.status(200).json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, TaskRepository, taskService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        yield taskService.deleteTask(taskId);
        res.status(204).send(); // No Content
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.deleteTask = deleteTask;
const getAllTask = (req, res, taskRepository, taskService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTasks = yield taskService.getAllTasks();
        res.status(200).json(allTasks);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getAllTask = getAllTask;
