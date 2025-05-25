import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Curso = sequelize.define('Curso', {
  idCurso: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'cursos',
  timestamps: false
});

export default Curso;
