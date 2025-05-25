import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Departamento from './Departamento.js';

const Instructor = sequelize.define('Instructor',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idDepartamento: {
        type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Departamento,
      key: 'id'
    }
    
}, 
},
{
    tableName: 'Instructor',
    timestamps: false // Desactiva los timestamps (createdAt, updatedAt)
});
   // Relación: Un Instructor pertenece a un Departamento
Instructor.belongsTo(Departamento, { foreignKey: 'idDepartamento' });

export default Instructor;