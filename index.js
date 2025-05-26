// index.js (en la raíz del proyecto)  
     
   import express from 'express';    
   import sequelize from './src/db/connection.js'; // Importa la instancia (nota el .js)  

    // IMPORTAR LOS MODELOS para que Sequelize los registre
  import Departamento from "./src/models/Departamento.js";
  import Instructor from './src/models/Instructor.js';
  import Aula from './src/models/Aula.js';
  import Carrera from './src/models/Carrera.js';
  import CarreraxEstudiante from './src/models/CarreraxEstudiante.js';
  import ComisionFunction from "./src/models/Comision.js"; 
  import Curso from "./src/models/Curso.js"
  import Estudiante from './src/models/Estudiante.js';
  import Inscripcion from './src/models/Inscripcion.js';
  import Prerrequisito from './src/models/Prerrequisito.js';

    // IMPORTAR LAS RUTAS
    import departamentoRoutes from './src/routes/departamento.routes.js';
    import instructorRoutes from './src/routes/instructor.routes.js';
    import aulaRoutes from './src/routes/aula.routes.js';
    import carreraRoutes from './src/routes/carrera.routes.js';
    import carreraxEstudianteRoutes from './src/routes/carreraxEstudiante.routes.js';
    import comisionRoutes from './src/routes/comision.routes.js';
    import cursoRoutes from './src/routes/curso.routes.js';
    import estudianteRoutes from './src/routes/estudiante.routes.js';
    import inscripcionRoutes from './src/routes/inscripcion.routes.js';
    import prerrequisitoRoutes from './src/routes/prerrequisito.routes.js'


    //inicializo los que son funciones
    const CarreraModelo = Carrera(sequelize);
    const ComisionModelo = ComisionFunction(sequelize);

     
   const app = express();  
     
   const PORT = process.env.PORT || 3000;  
     
   // Middleware básico para parsear JSON  
     
   app.use(express.json());  
// usar las rutas
  app.use('/api/departamentos', departamentoRoutes);
  app.use('/api/instructores', instructorRoutes);
  app.use('/api/aulas', aulaRoutes);
  app.use('/api/carreras', carreraRoutes);
  app.use('/api/carreraxEstudiantes', carreraxEstudianteRoutes);
  app.use('/api/comisiones', comisionRoutes);
  app.use('/api/cursos', cursoRoutes);
  app.use('/api/estudiantes', estudianteRoutes);
  app.use('/api/inscripciones', inscripcionRoutes);
  app.use('/api/prerrequisitos', prerrequisitoRoutes);
  


  

     
   // Ruta de prueba  
     
   app.get('/', (req, res) => {  
     
     res.send('¡Backend funcionando!');  
     
   });  
     
   // Iniciar servidor y probar conexión DB  
     
   async function startServer() {  
     
     try {  
     
       // Intenta autenticar la conexión a la DB  
     
       await sequelize.authenticate();  
     
       console.log('✅ Conexión a la base de datos establecida correctamente.');  
     
       // Sincroniza modelos (más sobre esto en el Paso 3\)  
     
       // await sequelize.sync({ force: false });  
     
       // console.log('🔄 Modelos sincronizados con la base de datos.');  
     
       // Inicia el servidor Express  
     
       app.listen(PORT, () => {  
     
         console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);  
     
       });  
     
     } catch (error) {  
     
       console.error('❌ No se pudo conectar a la base de datos:', error);  
     
     }  
     
   }  
     
   startServer();  