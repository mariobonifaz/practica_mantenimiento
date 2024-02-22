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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const TasksModel_1 = __importDefault(require("../../domain/entities/TasksModel"));
class PostgresUserRepository {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Encriptar la contraseña antes de almacenarla en la base de datos
                // Crear un nuevo usuario en la base de datos
                const newTask = yield TasksModel_1.default.create({
                    name: task.nombre,
                    date: task.date,
                    status: task.status,
                    description: task.description,
                    allocator: task.allocator
                });
                // Devolver el usuario recién creado
                return newTask.toJSON();
            }
            catch (error) {
                // Manejar errores de validación o de la base de datos aquí
                const errorMessage = (error instanceof Error && error.message) ? error.message : 'Unknown error';
                throw new Error(`Error creating user: ${errorMessage}`);
            }
        });
    }
    findById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield TasksModel_1.default.findByPk(taskId);
                return task ? task.toJSON() : null;
            }
            catch (error) {
                throw new Error(`Error finding user: ${error.message}`);
            }
        });
    }
    update(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield TasksModel_1.default.update({
                    name: task.nombre,
                    dates: task.date,
                    status: task.status,
                    description: task.description,
                    allocator: task.allocator
                    // Agrega aquí los demás campos que necesites actualizar
                }, {
                    where: { id: task.id } // Condición de búsqueda
                });
                return task;
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield TasksModel_1.default.findByPk(taskId);
                if (!task) {
                    throw new Error('User not found');
                }
                yield task.destroy();
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield TasksModel_1.default.findAll();
                return task.map(user => user.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
