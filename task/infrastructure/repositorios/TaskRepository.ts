// core/domain/repositories/UserRepository.ts
import { task } from "../../domain/entities/task";

export interface TaskRepository {
    createTask(task: task): Promise<task>;
    findById(taskId: string): Promise<task | null>; // Método para encontrar un usuario por su ID
    update(task: task): Promise<task>; // Método para actualizar un usuario
    deleteTask(taskId: string): Promise<void>;
    getAll(): Promise<task[]>;
}