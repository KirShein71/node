import express from 'express'
import YearController from '../controllers/yearController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', YearController.getAll)
router.get('/getone/:id([0-9]+)', YearController.getOne)
router.post('/create', YearController.create)
router.put('/update/:id([0-9]+)', YearController.update)
router.delete('/delete/:id([0-9]+)', YearController.delete)

export default router