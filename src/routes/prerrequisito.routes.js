// src/routes/prerrequisito.routes.js
import { Router } from 'express';
import Prerrequisito from '../models/Prerrequisito.js';

const router = Router();

// --- GET /api/prerrequisito ---
router.get('/', async (req, res) => {
  try {
    const prerrequisitos = await Prerrequisito.findAll();
    res.status(200).json(prerrequisitos);
  } catch (error) {
    console.error("Error al obtener los prerrequisitos:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- GET /api/prerrequisito/:idCurso/:idCursoPrerrequisito ---
router.get('/:idCurso/:idCursoPrerrequisito', async (req, res) => {
  const { idCurso, idCursoPrerrequisito } = req.params;
  try {
    const curso = await Prerrequisito.findOne({ where: { idCurso, idCursoPrerrequisito } });
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ message: 'Prerrequisito no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener el prerrequisito:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- POST /api/prerrequisito ---
router.post('/', async (req, res) => {
  try {
    const nuevoPrerrequisito = await Prerrequisito.create(req.body);
    res.status(201).json(nuevoPrerrequisito);
  } catch (error) {
    console.error("Error al crear el prerrequisito:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'Error de validación', 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// --- DELETE /api/prerrequisito/:idCurso/:idCursoPrerrequisito ---
router.delete('/:idCurso/:idCursoPrerrequisito', async (req, res) => {
  const { idCurso, idCursoPrerrequisito } = req.params;
  try {
    const resultado = await Prerrequisito.destroy({
      where: { idCurso, idCursoPrerrequisito }
    });

    if (resultado > 0) {
      res.status(200).json({ message: 'Prerrequisito eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Prerrequisito no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar prerrequisito:", error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default router;
