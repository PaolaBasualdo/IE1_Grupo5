import { Router } from 'express';
import { Curso } from '../models/index.js';

const router = Router();

// --- GET /api/cursos (Obtener todos los cursos) ---
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- GET /api/cursos/:id (Obtener un curso por ID) ---
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ message: 'Curso no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener curso:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- POST /api/cursos (Crear un nuevo curso) ---
router.post('/', async (req, res) => {
  try {
    const nuevoCurso = await Curso.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error("Error al crear curso:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- PUT /api/cursos/:id (Actualizar un curso existente) ---
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if (curso) {
      const actualizado = await curso.update(req.body);
      res.status(200).json(actualizado);
    } else {
      res.status(404).json({ message: 'Curso no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- DELETE /api/cursos/:id (Eliminar un curso) ---
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Curso.destroy({ where: { idCurso: id } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Curso eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Curso no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default router;
