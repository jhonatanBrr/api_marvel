import { Router } from "express";
import {obtenerpersonajes, crearPersonaje} from '../controllers/personajes.controller.js'

const router = Router()

router.get('/personajes', obtenerpersonajes)
router.post('/personajes/crear', crearPersonaje)

export default router