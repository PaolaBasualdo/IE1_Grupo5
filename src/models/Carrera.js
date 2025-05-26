import { DataTypes } from 'sequelize';

const Carrera = (sequelize) => {
    return sequelize.define('Carrera', {
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
        departamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'carreras',
        timestamps: true
    });
};

export default Carrera;
