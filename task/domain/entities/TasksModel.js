"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// adapters/persistence/models/UserModel.ts
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../database/sequelize");
const TaskModel = sequelize_2.sequelize.define('Task', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    allocator: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "Task",
    freezeTableName: true
});
TaskModel.sync()
    .then(() => {
    console.log('Tabla de usuarios creada correctamente.');
})
    .catch(error => {
    console.error('Error al crear la tabla de usuarios:', error);
});
exports.default = TaskModel; // Asegúrate de exportar correctamente el modelo aquí
