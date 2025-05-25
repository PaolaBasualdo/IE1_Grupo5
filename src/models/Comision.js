import { DataTypes } from 'sequelize';

const Comision = (sequelize) => {
    return sequelize.define('Comision', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE : { 
            type: DataTypes.STRING(255),
            allowNull: false
            
        },
        PERIODO: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        CUPO_MAXIMO: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1 // cupo minimo
            }
        },

        
        //fk
        ID_CURSO: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CURSOS',
                key: 'ID'      
            }
        },
        ID_INSTRUCTOR: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'INSTRUCTORES', 
                key: 'ID'          
            }
        },
        ID_AULA: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'AULAS', 
                key: 'ID'       
            }
        }
    }, {
        tableName: 'COMISIONES', 
        timestamps: true 
    });
};
export default Comision;