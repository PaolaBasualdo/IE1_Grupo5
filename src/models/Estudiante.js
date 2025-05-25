import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Estudiante = sequelize.define('Estudiante', {
  idEstudiante: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  fechaNac: { type: DataTypes.DATEONLY, allowNull: true },
  direccion: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } }
}, {
  tableName: 'estudiantes',
  timestamps: false
});

export default Estudiante;