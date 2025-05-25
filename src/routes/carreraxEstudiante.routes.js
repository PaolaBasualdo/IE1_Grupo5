// src/routes/carreraxEstudiante.routes.js
import { Router } from 'express';
import CarreraxEstudiante from '../models/CarreraxEstudiante.js'; // Importamos el modelo 

const router = Router();

// --- GET /api/carreraxEstudiantes (Obtener todas las inscripciones) ---

router.get('/', async (req, res) => {
    try {
        const carreraxEstudiantes = await CarreraxEstudiante.findAll();
        res.status(200).json(carreraxEstudiantes);
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- GET /api/carreraxEstudiantes/:id (Obtener una inscripcion específica) ---
router.get('/:idCarrera/:idEstudiante', async (req, res) => {
    const { idCarrera, idEstudiante } = req.params; 
    try {
        const inscripcion = await CarreraxEstudiante.findOne({ where: {idCarrera, idEstudiante}
        });

        if (inscripcion) {
            res.status(200).json(inscripcion);
        } else {
            res.status(404).json({ message: 'inscripción no encontrada' });
        }
    } catch (error) {
        console.error("Error al obtener inscripción por ID:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- POST /api/carreraxEstudiantes (Crear una nueva inscripción) ---
router.post('/', async (req, res) => {
    try {
        const nuevaInscripcion = await CarreraxEstudiante.create(req.body);
        res.status(201).json(nuevaInscripcion); 
    } catch (error) {
        console.error("Error al crear inscripción:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ 
                message: 'Error de validación', 
                errors: error.errors.map(e => e.message) 
            });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- PUT /api/carreraxEstudiantes/:id (Actualizar una inscripción existente) ---
router.put('/:idCarrera/:idEstudiante', async (req, res) => {
    const { idCarrera, idEstudiante } = req.params;
    try {
        const inscripcion = await CarreraxEstudiante.findOne({
            where: {idCarrera, idEstudiante}
        });

        if (inscripcion) {
            const inscripcionActualizada = await inscripcion.update(req.body);
            res.status(200).json(inscripcionActualizada);
        } else {
            res.status(404).json({ message: 'Inscripción no encontrada para actualizar' });
        }
    } catch (error) {
        console.error("Error al actualizar inscripción:", error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                message: 'Error de validación', 
                errors: error.errors.map(e => e.message) 
            });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- DELETE /api/carreraxEstudiantes/:id (Eliminar una inscripción) ---
router.delete('/:idCarrera/:idEstudiante', async (req, res) => {
    const { idCarrera, idEstudiante } = req.params;
    try {
        const resultado = await CarreraxEstudiante.destroy({
            where: { idCarrera, idEstudiante }
        });
        
        if (resultado > 0) { 
            res.status(200).json({ message: 'Inscrpción eliminada exitosamente' }); 
        } else {
            res.status(404).json({ message: 'Inscripción no encontrada para eliminar' });
        }
    } catch (error) {
        console.error("Error al eliminar inscripción:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

export default router;
