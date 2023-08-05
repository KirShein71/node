import express from 'express'
import WineryController from '../controllers/wineryController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', WineryController.getAll)
router.get('/getone/:id([0-9]+)', WineryController.getOne)
router.post('/create', WineryController.create)
router.put('/update/:id([0-9]+)', WineryController.update)
router.delete('/delete/:id([0-9]+)', WineryController.delete)

export default router