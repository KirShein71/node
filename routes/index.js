import express from 'express'

import product from './product.js'
import category from './category.js'
import winery from './winery.js'
import user from './user.js'
import year from './year.js'
import basket from './basket.js'
import order from  './order.js'
import event from './event.js'
import brand  from './brand.js'
import banner from './banner.js'



const router = new express.Router()

router.use('/product', product)
router.use('/category', category)
router.use('/winery', winery)
router.use('/user', user)
router.use('/year', year)
router.use('/basket', basket)
router.use('/order', order)
router.use('/brand', brand)
router.use('/event', event)
router.use('/banner', banner)



export default router