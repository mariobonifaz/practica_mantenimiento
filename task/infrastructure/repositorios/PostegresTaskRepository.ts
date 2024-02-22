// adapters/persistence/PostgresUserRepository.ts
import { task } from "../../domain/entities/task";
import { TaskRepository } from "./TaskRepository";
import TaskModel from "../../domain/entities/TasksModel";

export class PostgresUserRepository implements TaskRepository {
    async createTask(task: task): Promise<task> {
        try {
            // Encriptar la contraseña antes de almacenarla en la base de datos
            
            // Crear un nuevo usuario en la base de datos
            const newTask = await TaskModel.create({
                name: task.nombre,
                date: task.date,
                status: task.status,
                description: task.description,
                allocator: task.allocator
            });
            
            // Devolver el usuario recién creado
            return newTask.toJSON() as task;
        } catch (error) {
            // Manejar errores de validación o de la base de datos aquí
            const errorMessage = (error instanceof Error && error.message) ? error.message : 'Unknown error';
            throw new Error(`Error creating user: ${errorMessage}`);
        }
    }

    async findById(taskId: string): Promise<task | null> {
        try {
            const task = await TaskModel.findByPk(taskId);
            return task ? task.toJSON() as task : null;
        } catch (error) {
            throw new Error(`Error finding user: ${(error as Error).message}`);
        }
    }

    async update(task: task): Promise<task> {
        try {
            await TaskModel.update(
                {
                    name: task.nombre,
                    dates: task.date,
                    status: task.status,
                    description: task.description,
                    allocator: task.allocator

                    // Agrega aquí los demás campos que necesites actualizar
                },
                {
                    where: { id: task.id } // Condición de búsqueda
                }
            );
            return task;
        } catch (error) {
            throw new Error(`Error updating user: ${(error as Error).message}`);
        }
    }

    async deleteTask(taskId: string): Promise<void> {
        try {
            const task = await TaskModel.findByPk(taskId);
            if (!task) {
                throw new Error('User not found');
            }
            await task.destroy();
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async getAll(): Promise<task[]> {
        try {
            const task = await TaskModel.findAll();
            return task.map(user => user.toJSON() as task);
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }
}
