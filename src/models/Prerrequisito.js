import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Prerrequisito = sequelize.define('Prerrequisito', {
    idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'cursos',
            key: 'id'
        }
    },
    idCursoPrerrequisito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'cursos',
            key: 'id'
        }
    }
    }, {
        tableName: 'prerrequisitos',
        timestamps: false
    });

export default Prerrequisito;
