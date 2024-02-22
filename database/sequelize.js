"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// adapters/persistence/sequelize.ts
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('hex_demo', 'postgres', '040902', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
