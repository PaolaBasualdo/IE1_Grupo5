// Importación de modelos
import Departamento from './Departamento.js';
import Carrera from './Carrera.js';
import Estudiante from './Estudiante.js';
import Aula from './Aula.js';
import Instructor from './Instructor.js';
import Curso from './Curso.js';
import Comision from './Comision.js';
import Inscripcion from './Inscripcion.js';
import CarreraxEstudiante from './CarreraxEstudiante.js';
import Prerrequisito from './Prerrequisito.js';

// Departamento - Carrera (1:N)
Departamento.hasMany(Carrera, { foreignKey: 'idDepartamento', sourceKey: 'idDepartamento' });
Carrera.belongsTo(Departamento, { foreignKey: 'idDepartamento', targetKey: 'idDepartamento' });

// Departamento - Curso (1:N)
Departamento.hasMany(Curso, { foreignKey: 'idDepartamento', sourceKey: 'idDepartamento' });
Curso.belongsTo(Departamento, { foreignKey: 'idDepartamento', targetKey: 'idDepartamento' });

// Departamento - Instructor (1:N)
Departamento.hasMany(Instructor, { foreignKey: 'idDepartamento', sourceKey: 'idDepartamento' });
Instructor.belongsTo(Departamento, { foreignKey: 'idDepartamento', targetKey: 'idDepartamento' });

// Carrera - Estudiante (N:M)
Carrera.belongsToMany(Estudiante, {
  through: CarreraxEstudiante,
  foreignKey: 'idCarrera',
  otherKey: 'idEstudiante'
});
Estudiante.belongsToMany(Carrera, {
  through: CarreraxEstudiante,
  foreignKey: 'idEstudiante',
  otherKey: 'idCarrera'
});

// Curso - Prerrequisito (N:M consigo mismo)
Curso.belongsToMany(Curso, {
  through: Prerrequisito,
  as: 'CursosRequeridos',
  foreignKey: 'idCurso',
  otherKey: 'idCursoRequisito'
});

// Curso - Comision (1:N)
Curso.hasMany(Comision, { foreignKey: 'idCurso', sourceKey: 'idCurso' });
Comision.belongsTo(Curso, { foreignKey: 'idCurso', targetKey: 'idCurso' });

// Instructor - Comision (1:N)
Instructor.hasMany(Comision, { foreignKey: 'idInstructor', sourceKey: 'idInstructor' });
Comision.belongsTo(Instructor, { foreignKey: 'idInstructor', targetKey: 'idInstructor' });

// Aula - Comision (1:N)
Aula.hasMany(Comision, { foreignKey: 'idAula', sourceKey: 'idAula' });
Comision.belongsTo(Aula, { foreignKey: 'idAula', targetKey: 'idAula' });

// Estudiante - Inscripcion (1:N)
Estudiante.hasMany(Inscripcion, { foreignKey: 'idEstudiante', sourceKey: 'idEstudiante' });
Inscripcion.belongsTo(Estudiante, { foreignKey: 'idEstudiante', targetKey: 'idEstudiante' });

// Comision - Inscripcion (1:N)
Comision.hasMany(Inscripcion, { foreignKey: 'idComision', sourceKey: 'idComision' });
Inscripcion.belongsTo(Comision, { foreignKey: 'idComision', targetKey: 'idComision' });

// Exportar todos los modelos
export {
  Departamento,
  Carrera,
  Estudiante,
  Aula,
  Instructor,
  Curso,
  Comision,
  Inscripcion,
  CarreraxEstudiante,
  Prerrequisito
};
