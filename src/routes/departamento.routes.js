import { Router } from "express";
import Departamento from '../models/Departamento.js';

const router = Router();

// Obtener todos los departamentos
router.get("/", async (req, res) => {
try {
    const departamentos = await Departamento.findAll();
    res.json(departamentos);
} catch (error) {
    console.error("Error al obtener todos los departamentos:", error);
    res.status(500).json({ error: "Error al obtener departamentos" });
}
})

// Obtener un departamento por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return res.status(404).json({ error: "Departamento no encontrado" });
        }
        res.json(departamento);
    } catch (error) {
        console.error("Error al obtener el departamento:", error);
        res.status(500).json({ error: "Error al obtener el departamento" });
    }
});

// Crear un nuevo departamento
router.post("/", async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevoDepartamento = await Departamento.create({ nombre });
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        console.error("Error al crear el departamento:", error);
        res.status(500).json({ error: "Error al crear el departamento" });
    }
});
//Crear varios departamentos a la vez
router.post("/bulk", async (req, res) => {
    const departamentos = req.body; // Debe ser un array de objetos { nombre }
    try {
        const nuevosDepartamentos = await Departamento.bulkCreate(departamentos);
        res.status(201).json(nuevosDepartamentos);
    } catch (error) {
        console.error("Error al crear los departamentos:", error);
        res.status(500).json({ error: "Error al crear los departamentos" });
    }
});

// Actualizar un departamento
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return res.status(404).json({ error: "Departamento no encontrado" });
        }
        departamento.nombre = nombre;
        await departamento.save();
        res.json(departamento);
    } catch (error) {
        console.error("Error al actualizar el departamento:", error);
        res.status(500).json({ error: "Error al actualizar el departamento" });
    }
});
// Eliminar un departamento
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return res.status(404).json({ error: "Departamento no encontrado" });
        }
        await departamento.destroy();
        res.json({ message: "Departamento eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el departamento:", error);
        res.status(500).json({ error: "Error al eliminar el departamento" });
    }
});
export default router;