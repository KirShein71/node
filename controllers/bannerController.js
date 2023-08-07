import BannerModel from '../models/Banner.js'
import AppError from '../errors/AppError.js'

class BannerController {
    async getAll(req, res, next) {
        try {
            const banner = await BannerModel.getAll()
            res.json(banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const banner = await BannerModel.getOne(req.params.id)
            res.json(banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const banner = await BannerModel.create(req.body, req.files?.image)
            res.json(banner)
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
            const banner = await BannerModel.update(req.params.id, req.body, req.files?.image)
            res.json(banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const banner = await BannerModel.delete(req.params.id)
            res.json(banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BannerController()