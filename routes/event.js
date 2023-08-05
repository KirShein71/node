import express from 'express'
import EventController from '../controllers/eventController.js'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', EventController.getAll)
router.get('/getone/:id([0-9]+)', EventController.getOne)
router.post('/create',  EventController.create)
// обновить товар каталога  — нужны права администратора
router.put('/update/:id([0-9]+)',  EventController.update)
// удалить товар каталога  — нужны права администратора
router.delete('/delete/:id([0-9]+)',  EventController.delete)






export default router