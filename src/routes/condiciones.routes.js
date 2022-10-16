import { Router } from "express";
import {obtenerCondiciones} from '../controllers/condiciones.controller.js'

const router = Router()

router.get('/condiciones', obtenerCondiciones)

export default router