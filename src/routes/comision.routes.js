// src/routes/comision.routes.js

import { Router } from 'express';
import { Comision } from '../models/Comision.js'; // importamos modelo 

const router = Router(); 

// --- GET /api/comisiones (Obtener todas las comisiones) ---
router.get('/', async (req, res) => { 
  try {
    const comisiones = await Comision.findAll(); 
    res.status(200).json(comisiones); 
  } catch (error) {
    console.error("Error al obtener comisiones:", error); 
    res.status(500).json({ 
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- GET /api/comisiones/:id (Obtener una comisión por ID) ---
router.get('/:id', async (req, res) => { 
  try {
    const { id } = req.params; 
    const comision = await Comision.findByPk(id); 

    if (comision) { 
      res.status(200).json(comision); 
    } else { 
      res.status(404).json({ message: 'comisión no encontrada' });
    }
  } catch (error) {
    console.error("Error al buscar una comisión por ID:", error);
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- POST /api/comisiones (Crear una nueva comisión) ---
router.post('/', async (req, res) => { 
  try {
    const nuevaComision = await Comision.create(req.body);
    res.status(201).json(nuevaComision); 
  } catch (error) {
    console.error("Error al intentar crear una comisión:", error);
    
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'error de validación',
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ 
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- PUT /api/comisiones/:id (Actualizar una comisión existente) ---
router.put('/:id', async (req, res) => { 
  try {
    const { id } = req.params; 
    const comision = await Comision.findByPk(id); 

    if (comision) { 
      const actualizado = await comision.update(req.body); 
      res.status(200).json(actualizado); 
    } else { 
      res.status(404).json({ message: 'comisión no encontrada para actualizar' }); 
    }
  } catch (error) {
    console.error("Error al actualizar la comisión:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

// --- DELETE /api/comisiones/:id (Eliminar una comisión) ---
router.delete('/:id', async (req, res) => { 
  try {
    const { id } = req.params; 
    const resultado = await Comision.destroy({ where: { id: id } });

    if (resultado > 0) { 
      res.status(200).json({ message: 'Comisión eliminada exitosamente.' });
    } else { 
      res.status(404).json({ message: 'no se encontro comisión para eliminar' }); 
    }
  } catch (error) {
    console.error("Error al borrar una comisión:", error);
    res.status(500).json({
      message: 'error interno del servidor',
      error: error.message
    });
  }
});

export default router; 

// --- Rutas CRUD para Comisiones  ---
/* 
// Obtener todas las comisiones
router.get('/', getAllComisiones);

// Obtener una comisión por ID
router.get('/:id', getComisionById);

// Crear una nueva comisión
router.post('/', createComision);

// Actualizar una comisión existente
router.put('/:id', updateComision);

// Eliminar una comisión
router.delete('/:id', deleteComision);
*/
