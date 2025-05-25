import { Router } from "express";
import Instructor from "../models/Instructor.js";
import Departamento from '../models/Departamento.js';

const router = Router();

// Obtener todos los instructores
router.get("/", async (req, res) => {
    try {
        const instructores = await Instructor.findAll({ include: Departamento }); // Incluye el modelo Departamento para obtener los datos relacionados
        res.json(instructores);
    } catch (error) {
        console.error("Error al obtener todos los instructores:", error);
        res.status(500).json({ error: "Error al obtener instructores" });
    }
});
// Obtener un instructor por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const instructor = await Instructor.findByPk(id, {include: Departamento });
        if (!instructor) {
            return res.status(404).json({ error: "Instructor no encontrado" });
        }
        res.json(instructor);
    } catch (error) {
        console.error("Error al obtener el instructor:", error);
        res.status(500).json({ error: "Error al obtener el instructor" });
    }
});
// Crear un nuevo instructor
router.post("/", async (req, res) => {
    const { nombre, idDepartamento } = req.body;
    try {
        const nuevoInstructor = await Instructor.create({ nombre, idDepartamento });
        res.status(201).json(nuevoInstructor);
    } catch (error) {
        console.error("Error al crear el instructor:", error);
        res.status(500).json({ error: "Error al crear el instructor" });
    }
});

// Crear varios instructores a la vez
router.post("/bulk", async (req, res) => {
    const instructores = req.body; // Debe ser un array de objetos { nombre, idDepartamento }
    try {
        const nuevosInstructores = await Instructor.bulkCreate(instructores);
        res.status(201).json(nuevosInstructores);
    } catch (error) {
        console.error("Error al crear los instructores:", error);
        res.status(500).json({ error: "Error al crear los instructores" });
    }
});
// Actualizar un instructor
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, idDepartamento } = req.body;
    try {
        const instructor = await Instructor.findByPk(id);
        if (!instructor) {
            return res.status(404).json({ error: "Instructor no encontrado" });
        }
        instructor.nombre = nombre;
        instructor.idDepartamento = idDepartamento;
        await instructor.save();
        res.json(instructor);
    } catch (error) {
        console.error("Error al actualizar el instructor:", error);
        res.status(500).json({ error: "Error al actualizar el instructor" });
    }
});
// Eliminar un instructor
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const instructor = await Instructor.findByPk(id);
        if (!instructor) {
            return res.status(404).json({ error: "Instructor no encontrado" });
        }
        await instructor.destroy();
        res.json({ message: "Instructor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el instructor:", error);
        res.status(500).json({ error: "Error al eliminar el instructor" });
    }
});
export default router;