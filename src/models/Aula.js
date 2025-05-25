import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Aula = sequelize.define('Aula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    }, {
        tableName: 'aula',
        timestamps: false,
    });

    export default Aula;