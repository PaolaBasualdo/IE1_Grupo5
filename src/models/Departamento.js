import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Departamento = sequelize.define('Departamento', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName:'Departamento',
        timestamps: false, // Desactiva los timestamps (createdAt, updatedAt)
    
});

export default Departamento;