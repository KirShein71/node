import ProductModel from '../models/Product.js'
import AppError from '../errors/AppError.js'


class ProductController {
    async getAll(req, res, next) {
        try {
            const {categoryId = null, wineryId = null, yearId = null, brandId = null} = req.params
            let {limit=null, page=null} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 32
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {categoryId, wineryId, yearId, brandId, limit, page}
            const products = await ProductModel.getAll(options)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.getOne(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async searchProducts  (req, res)  {
        try {
          const searchTerm = req.query.searchTerm;
          const products = await ProductModel.searchByName(searchTerm);
          res.json(products);
        } catch (error) {
          console.error('Error searching products:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
        console.log(req.query.searchTerm)
      };

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const product = await ProductModel.create(req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const product = await ProductModel.update(req.params.id, req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.delete(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}


export default new ProductController()