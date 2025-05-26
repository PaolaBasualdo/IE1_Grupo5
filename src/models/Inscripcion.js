import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Inscripcion = sequelize.define('Inscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  idEstudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiantes',
      key: 'id'
    }
  },
  idComision: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'comisiones',
      key: 'id'
    }
  }
}, {
  tableName: 'Inscripciones',
  timestamps: true
});

export default Inscripcion;
