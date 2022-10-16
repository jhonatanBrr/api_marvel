import { Router } from "express";
import {obtenerGrupos} from '../controllers/grupos.controller.js'

const router = Router()

router.get('/grupos', obtenerGrupos)

export default router