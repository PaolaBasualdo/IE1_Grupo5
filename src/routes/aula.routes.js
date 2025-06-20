// src/routes/aula.routes.js
import { Router } from 'express';
import Aula from '../models/Aula.js'; // Importamos el modelo 

const router = Router();

// --- GET /api/aulas (Obtener todas las aulas) ---
// Esta ruta recuperará todas las aulas de la base de datos.
router.get('/', async (req, res) => {
    try {
        // Aula.findAll(): Método de Sequelize para obtener todos los registros
        // de la tabla asociada al modelo 'Aula'.
        // Devuelve una promesa que resuelve con un array de instancias de Aula.
        const aulas = await Aula.findAll();
        res.status(200).json(aulas);
    } catch (error) {
        console.error("Error al obtener aulas:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- GET /api/aulas/:id (Obtener un aulas por ID) ---
// Esta ruta recuperará un aula específico basado en su ID.
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el id de los parámetros de la URL

        // Aula.findByPk(primaryKey): Método de Sequelize para buscar un registro
        // por su clave primaria (Primary Key). En este caso, 'id'.
        // Devuelve una promesa que resuelve con la instancia encontrada o null si no existe.
        const aula = await Aula.findByPk(id);

        if (aula) {
            res.status(200).json(aula);
        } else {
            res.status(404).json({ message: 'Aula no encontrada' });
        }
    } catch (error) {
        console.error("Error al obtener aula por ID:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- POST /api/aulas (Crear una nueva aula) ---
// Esta ruta creará una nueva aula en la base de datos.
router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos enviados en el cuerpo de la solicitud HTTP (generalmente en formato JSON).
        // Aula.create(data): Método de Sequelize para crear un nuevo registro.
        // 'data' es un objeto con los campos y valores de la nueva aula.
        // Devuelve una promesa que resuelve con la instancia recién creada.
            const nuevaAula = await Aula.create(req.body);
            res.status(201).json(nuevaAula); // 201 Created
    } catch (error) {
        console.error("Error al crear aula:", error);
        // Manejo de errores específicos de Sequelize (ej. validaciones)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- PUT /api/aulas/:id (Actualizar un aula existente) ---
// Esta ruta actualizará la información de un aula existente.
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        // Primero, buscamos el aula para asegurarnos de que existe.
        const aula = await Aula.findByPk(id);

        if (aula) {
        // aula.update(data): Método de instancia de Sequelize para actualizar
        // los campos del registro. 'data' es un objeto con los campos a modificar.
        // Devuelve una promesa que resuelve con la instancia actualizada.
        const aulaActualizada = await aula.update(datosActualizar);
            res.status(200).json(aulaActualizada);
        } else {
            res.status(404).json({ message: 'Aula no encontrada para actualizar' });
        }
    } catch (error) {
        console.error("Error al actualizar aula:", error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// --- DELETE /api/aulas/:id (Eliminar un aula) ---
// Esta ruta eliminará un aula de la base de datos.
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Aula.destroy({ where: { condicion } }): Método de Sequelize para eliminar
        // registros que cumplan con la condición especificada en 'where'.
        // Devuelve una promesa que resuelve con el número de filas eliminadas.
        const resultado = await Aula.destroy({
            where: { id: id }
        });

        if (resultado > 0) { // Si resultado es mayor que 0, significa que se eliminó al menos una fila.
            res.status(200).json({ message: 'Aula eliminada exitosamente' }); // O 204 No Content si no se devuelve cuerpo
        } else {
            res.status(404).json({ message: 'Aula no encontrada para eliminar' });
        }
    } catch (error) {
        console.error("Error al eliminar aula:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

export default router;