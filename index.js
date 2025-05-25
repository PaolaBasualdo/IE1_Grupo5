// index.js (en la raíz del proyecto)  
     
   import express from 'express';    
   import sequelize from './src/db/connection.js'; // Importa la instancia (nota el .js)  

    // IMPORTAR LOS MODELOS para que Sequelize los registre
  import Departamento from "./src/models/Departamento.js";
  import Instructor from './src/models/Instructor.js';

    // IMPORTAR LAS RUTAS
    import departamentoRoutes from './src/routes/departamento.routes.js';
    import instructorRoutes from './src/routes/instructor.routes.js';
     
   const app = express();  
     
   const PORT = process.env.PORT || 3000;  
     
   // Middleware básico para parsear JSON  
     
   app.use(express.json());  
// usar las rutas
  app.use('/api/departamentos', departamentoRoutes);
  app.use('/api/instructores', instructorRoutes);

     
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