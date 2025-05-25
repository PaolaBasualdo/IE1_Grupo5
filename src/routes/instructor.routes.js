import { Router } from 'express';
import { Instructor } from '../models/index.js';

const router = Router();

// --- GET /api/instructor (Obtener todos los instructores) ---
router.get('/', async (req, res) => {
  try {
    const instructores = await Instructor.findAll();
    res.status(200).json(instructores);
  } catch (error) {
    console.error("Error al obtener instructores:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- GET /api/instructores/:id (Obtener un instructor por ID) ---
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);
    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener instructor:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- POST /api/instructores (Crear un nuevo instructor) ---
router.post('/', async (req, res) => {
  try {
    const nuevoInstructor = await Instructor.create(req.body);
    res.status(201).json(nuevoInstructor);
  } catch (error) {
    console.error("Error al crear instructor:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- PUT /api/instructores/:id (Actualizar un instructor existente) ---
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);
    if (instructor) {
      const actualizado = await instructor.update(req.body);
      res.status(200).json(actualizado);
    } else {
      res.status(404).json({ message: 'Instructor no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar instructor:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- DELETE /api/instructores/:id (Eliminar un instructor) ---
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Instructor.destroy({ where: { idInstructor: id } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Instructor eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Instructor no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar instructor:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default router;
