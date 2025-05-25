import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Instructor = sequelize.define('Instructor', {
  idInstructor: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'instructores',
  timestamps: false
});

export default Instructor;
