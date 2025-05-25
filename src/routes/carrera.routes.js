import { Router } from 'express';
import { Carrera } from '../models/index.js';

const router = Router();

  // obtener todas las carreras

router.get('/', async (req, res) => {
  try {
    const carreras = await Carrera.findAll(); 
    res.status(200).json(carreras);           
  } catch (error) {
    console.error("Error al obtener carreras:", error); 
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
});

     
//rutas

router.get('/', getAllCarreras);

export default router;
