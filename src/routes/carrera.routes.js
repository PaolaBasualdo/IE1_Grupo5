import { Router } from 'express';
import { Carrera } from '../models/Carrera.js'; // importamos modelo 

const router = Router(); 

// --- GET /api/carreras (Obtener todos los carreras) ---
router.get('/', async (req, res) => { 
  try {
    const carreras = await Carrera.findAll(); 
    res.status(200).json(carreras); 
  } catch (error) {
    console.error("Error al obtener carreras", error); 
    res.status(500).json({ 
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- GET /api/carreras/:id (Obtener una carrera por ID) ---
router.get('/:id', async (req, res) => { 
  try {
    const { id } = req.params; 
    const carrera = await Carrera.findByPk(id); 

    if (carrera) { 
      res.status(200).json(carrera); 
    } else { 
      res.status(404).json({ message: 'carrera no encontrada' });
    }
  } catch (error) {
    console.error("error al buscar una carrera por ID:", error);
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- POST /api/carreras (Crear una nueva carrera) ---
router.post('/', async (req, res) => { 
  try {
    const nuevaCarrera = await Carrera.create(req.body);
    res.status(201).json(nuevaCarrera); 
  } catch (error) {
    console.error("error al intentar crear una carrera:", error);
    
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'error de validacion',
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ 
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- PUT /api/carreras/:id (Actualizar una carrera existente) ---
router.put('/:id', async (req, res) => { 
  try {
    const { id } = req.params; // "ID de la URL".
    const carrera = await Carrera.findByPk(id); 

    if (carrera) { 
      const actualizado = await carrera.update(req.body); 
      res.status(200).json(actualizado); 
    } else { 
      res.status(404).json({ message: 'carrera no encontrada para actualizar' }); // codigo 404.
    }
  } catch (error) {
    console.error("error al actualizar la carrera:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'error de validacion',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- DELETE /api/carreras/:id (Eliminar una carrera) ---
router.delete('/:id', async (req, res) => { 
  try {
    const { id } = req.params; // "id de la URL".
    
    const resultado = await Carrera.destroy({ where: { id: id } });

    if (resultado > 0) { // Si resultado es mayor que 0, significa que se eliminó al menos una fila.
      res.status(200).json({ message: 'Carrera eliminada exitosamente.' });
    } else { // "Si el resultado es 0, es que no encontró la carrera para borrar".
      res.status(404).json({ message: 'no se encontro carrera para eliminar' }); //codigo 404".
    }
  } catch (error) {
    console.error("error al borrar una carrera:", error);
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

export default router; 

// --- Rutas CRUD para Carreras  ---
/* 
// Obtener todas las carreras
router.get('/', getAllCarreras);

// Obtener una carrera por ID
router.get('/:id', getCarreraById);

// Crear una nueva carrera
router.post('/', createCarrera);

// Actualizar una carrera existente
router.put('/:id', updateCarrera);

// Eliminar una carrera
router.delete('/:id', deleteCarrera); */