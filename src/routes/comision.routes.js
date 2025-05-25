import { Router } from 'express';
import { Comision } from '../models/index.js';

const router = Router();

// Obtener todas las comisiones
const getAllComisiones = async (req, res) => {
    try {
        const comisiones = await Comision.findAll();
        res.json(comisiones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener comisiones' });
    }
};


// rutas
router.get('/', getAllComisiones);        
   

export default router;
