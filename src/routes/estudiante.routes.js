import { Router } from 'express';
import { Estudiante } from '../models/index.js';

const router = Router();

// --- GET /api/estudiantes (Obtener todos los estudiantes) ---
router.get('/', async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- GET /api/estudiantes/:id (Obtener un estudiante por ID) ---
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id);
    if (estudiante) {
      res.status(200).json(estudiante);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener estudiante:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- POST /api/estudiantes (Crear un nuevo estudiante) ---
router.post('/', async (req, res) => {
  try {
    const nuevoEstudiante = await Estudiante.create(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- PUT /api/estudiantes/:id (Actualizar un estudiante existente) ---
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id);
    if (estudiante) {
      const actualizado = await estudiante.update(req.body);
      res.status(200).json(actualizado);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- DELETE /api/estudiantes/:id (Eliminar un estudiante) ---
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Estudiante.destroy({ where: { idEstudiante: id } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default router;
