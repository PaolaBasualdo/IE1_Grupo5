import { Router } from 'express';
import { Inscripcion } from '../models/index.js';

const router = Router();

// --- GET /api/inscripcion (Obtener todos las inscripciones) ---
router.get('/', async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll();
    res.status(200).json(inscripciones);
  } catch (error) {
    console.error("Error al obtener inscripciones:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- GET /api/inscripcion/:id (Obtener una inscripcion por ID) ---
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const inscripcion = await Inscripcion.findByPk(id);
    if (inscripcion) {
      res.status(200).json(inscripcion);
    } else {
      res.status(404).json({ message: 'inscripcion no encontrada' });
    }
  } catch (error) {
    console.error("Error al obtener inscripcion:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- POST /api/inscripciones (Crear un nueva inscripcion) ---
router.post('/', async (req, res) => {
  try {
    const nuevaInscripcion = await Inscripcion.create(req.body);
    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    console.error("Error al crear inscripcion:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- PUT /api/inscripciones/:id (Actualizar una inscripcion existente) ---
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const inscripcion = await Inscripcion.findByPk(id);
    if (inscripcion) {
      const actualizado = await inscripcion.update(req.body);
      res.status(200).json(actualizado);
    } else {
      res.status(404).json({ message: 'Inscripcion no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar inscripcion:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- DELETE /api/inscripciones/:id (Eliminar una inscripcion) ---
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Inscripcion.destroy({ where: { id } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Inscripcion eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Inscripcion no encontrada para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar inscripcion:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default router;