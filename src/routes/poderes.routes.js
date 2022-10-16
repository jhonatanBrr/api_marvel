import { Router } from "express";
import { obtenerPoderes } from '../controllers/poderes.controller.js'

const router = Router()

router.get('/poderes', obtenerPoderes)

export default router