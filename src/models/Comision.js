import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Comision = sequelize.define('Comision', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { 
    type: DataTypes.STRING(255),
    allowNull: false
  },
  periodo: { 
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cupo_maximo: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },

  // fk
  
  id_curso: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_instructor: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_aula: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comisiones',
  timestamps: true
});

export default Comision;
