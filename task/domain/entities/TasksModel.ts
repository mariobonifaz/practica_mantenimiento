// adapters/persistence/models/UserModel.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/sequelize';

const TaskModel = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    allocator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
},{
    tableName: "Task",
    freezeTableName:true
});
TaskModel.sync()
  .then(() => {
    console.log('Tabla de usuarios creada correctamente.');
  })
  .catch(error => {
    console.error('Error al crear la tabla de usuarios:', error);
  })

export default TaskModel; // Asegúrate de exportar correctamente el modelo aquí
