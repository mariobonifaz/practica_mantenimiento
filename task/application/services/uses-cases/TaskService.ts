// core/domain/services/UserService.ts
import { task } from '../../../domain/entities/task';
import { TaskRepository } from '../../../infrastructure/repositorios/TaskRepository';

export class TaskService {
    constructor(private taskRepository: TaskRepository) {}

    async createTask(user: task): Promise<void> {
        // Encriptar la contraseña del usuario antes de almacenarla en la base de datos
        const taskData: task = { ...user };

        await this.taskRepository.createTask(taskData);
    }

    async updateTask(userId: string, userData: Partial<task>): Promise<task> {
        try {
            // Primero, obtenemos el usuario que queremos actualizar
            const existingUser = await this.taskRepository.findById(userId);

            // Si el usuario no existe, lanzamos un error
            if (!existingUser) {
                throw new Error('User not found');
            }

            // Actualizamos los campos proporcionados en userData
            Object.assign(existingUser, userData);

            // Guardamos los cambios en la base de datos
            const updatedUser = await this.taskRepository.update(existingUser);

            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${(error as Error).message}`);
        }
    }

    async deleteTask(userId: string): Promise<void> {
        try {
            const existingUser = await this.taskRepository.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }
            await this.taskRepository.deleteTask(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async getAllTasks(): Promise<task[]> {
        try {
            return await this.taskRepository.getAll();
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }
}
