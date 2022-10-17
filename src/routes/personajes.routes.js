import { Router } from "express";
import {obtenerpersonajes, crearPersonaje, editarPersonaje} from '../controllers/personajes.controller.js'

const router = Router()

router.get('/personajes', obtenerpersonajes)
router.post('/personajes/crear', crearPersonaje)
router.put('/personajes/:id',editarPersonaje)

export default router