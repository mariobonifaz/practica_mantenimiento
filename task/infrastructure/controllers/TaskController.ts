// adapters/controllers/UserController.ts
import { Request, Response } from "express";
import { TaskService } from "../../application/services/uses-cases/TaskService";
import { TaskRepository } from "../repositorios/TaskRepository";


export const registerTask = async (req: Request, res: Response, taskRepository: TaskRepository, taskService: TaskService) => {
    try {
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const updateTask = async (req: Request, res: Response, taskRepository: TaskRepository, taskService: TaskService) => {
    try {
        const taskId = req.params.id; // Suponiendo que el id del usuario está en los parámetros de la solicitud
        const updatedUser = await taskService.updateTask(taskId, req.body); // Llama al método de actualización del servicio de usuarios
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const deleteTask = async (req: Request, res: Response, TaskRepository: TaskRepository, taskService: TaskService) => {
    try {
        const taskId = req.params.id;
        await taskService.deleteTask(taskId);
        res.status(204).send(); // No Content
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getAllTask = async (req: Request, res: Response, taskRepository: TaskRepository, taskService: TaskService) => {
    try {
        const allTasks = await taskService.getAllTasks();
        res.status(200).json(allTasks);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};