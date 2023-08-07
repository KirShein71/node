import express from 'express'
import BannerController from '../controllers/BannerController.js'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', BannerController.getAll)
router.get('/getone/:id([0-9]+)', BannerController.getOne)
router.post('/create',  BannerController.create)
// обновить товар каталога  — нужны права администратора
router.put('/update/:id([0-9]+)',  BannerController.update)
// удалить товар каталога  — нужны права администратора
router.delete('/delete/:id([0-9]+)',  BannerController.delete)






export default router