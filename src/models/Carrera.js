import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Carrera = sequelize.define ( 'Carrera', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        idDepartamento: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'carreras',
        timestamps: true
    });


export default Carrera;
