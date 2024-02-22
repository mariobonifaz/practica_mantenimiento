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
exports.TaskService = void 0;
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Encriptar la contraseña del usuario antes de almacenarla en la base de datos
            const taskData = Object.assign({}, user);
            yield this.taskRepository.createTask(taskData);
        });
    }
    updateTask(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, obtenemos el usuario que queremos actualizar
                const existingUser = yield this.taskRepository.findById(userId);
                // Si el usuario no existe, lanzamos un error
                if (!existingUser) {
                    throw new Error('User not found');
                }
                // Actualizamos los campos proporcionados en userData
                Object.assign(existingUser, userData);
                // Guardamos los cambios en la base de datos
                const updatedUser = yield this.taskRepository.update(existingUser);
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    deleteTask(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.taskRepository.findById(userId);
                if (!existingUser) {
                    throw new Error('User not found');
                }
                yield this.taskRepository.deleteTask(userId);
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.taskRepository.getAll();
            }
            catch (error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
        });
    }
}
exports.TaskService = TaskService;
