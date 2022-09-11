import express from 'express'
const router = express.Router()

import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea
} from '../controllers/tareaController.js'

import checkAuth from '../middleware/checkAuth.js'

router.post('/', checkAuth, agregarTarea)

router
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)

router.post('/estado/:id', checkAuth, cambiarEstadoTarea)

export default router