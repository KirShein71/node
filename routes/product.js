import express from 'express'
import ProductController from '../controllers/productController.js'
import ProductInfoController from '../controllers/productInfoController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

// список товаров выбранной категории и выбранной винодельни
router.get('/getall/categoryId/:categoryId([0-9]+)/wineryId/:wineryId([0-9]+)', ProductController.getAll)
// список товаров выбранной категории, года и винодельни
router.get('/getall/categoryId/:categoryId([0-9]+)/wineryId/:wineryId([0-9]+)/yearId/:yearId([0-9]+)', ProductController.getAll)
// список товаров выбранной категории и года 
router.get('/getall/categoryId/:categoryId([0-9]+)/yearId/:yearId([0-9]+)', ProductController.getAll)
// список товаров выьранной винодельни и года
router.get('/getall/yearId/:yearId([0-9]+)/wineryId/:wineryId([0-9]+)', ProductController.getAll)
// спискок товаров выбранного года
router.get('/getall/yearId/:yearId([0-9]+)', ProductController.getAll)
//список товаров на главное странице
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
// список товаров выбранной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
// список товаров выбранного винодельни
router.get('/getall/wineryId/:wineryId([0-9]+)', ProductController.getAll)
// список всех товаров каталога
router.get('/getall', ProductController.getAll)
router.get('/getall/:searchTerm', ProductController.searchProducts);
router.get('/getone/:id([0-9]+)', ProductController.getOne)
// создать товар каталога — нужны права администратора
router.post('/create',  ProductController.create)
// обновить товар каталога  — нужны права администратора
router.put('/update/:id([0-9]+)',  ProductController.update)
// удалить товар каталога  — нужны права администратора
router.delete('/delete/:id([0-9]+)',  ProductController.delete)


// список свойств товара
router.get('/product/:productId([0-9]+)/property/getall', ProductInfoController.getAll)
// одно свойство товара
router.get('/product/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductInfoController.getOne)
// создать свойство товара
router.post(
    '/product/:productId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    ProductInfoController.create
)
// обновить свойство товара
router.put(
    '/product/:productId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductInfoController.update
)
// удалить свойство товара
router.delete(
    '/product/:productId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductInfoController.delete
)

export default router