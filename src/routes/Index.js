import { Router } from "express";

import aulaRoutes from './aula.routes.js';
import carreraxEstudianteRoutes from "./carreraxEstudiante.routes.js";
import carreraRoutes from './carreraRoutes.js';
import comisionRoutes from './comisionRoutes.js';
import cursoRoutes from './cursoRoutes.js';
import departamentoRoutes from './departamentoRoutes.js';
import estudianteRoutes from './estudianteRoutes.js';
import inscripcionRoutes from './inscripcionRoutes.js';
import instructorRoutes from './instructorRoutes.js';
import prerrequisitoRoutes from './prerrequisitoRoutes.js';

const router = Router();

router.use('/aulas', aulaRoutes);
router.use('/carrera-estudiantes', carreraxEstudianteRoutes);
router.use('/carreras', carreraRoutes);
router.use('/comisiones', comisionRoutes);
router.use('/cursos', cursoRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/estudiantes', estudianteRoutes);
router.use('/inscripciones', inscripcionRoutes);
router.use('/instructores', instructorRoutes);
router.use('/prerrequisitos', prerrequisitoRoutes);

export default router;