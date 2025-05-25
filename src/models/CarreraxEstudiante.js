import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const CarreraxEstudiante = sequelize.define('CarreraxEstudiante', {
    idCarrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idestudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
    }, {
        tableName: 'carrera_Estudiante',
        timestamps: false
    });

export default CarreraxEstudiante;
    