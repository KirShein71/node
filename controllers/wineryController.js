import WineryModel from '../models/Winery.js'
import AppError from '../errors/AppError.js'

class WineryController {
    async getAll(req, res, next) {
        try {
            const wineries = await WineryModel.getAll()
            res.json(wineries)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const winery = await WineryModel.getOne(req.params.id)
            res.json(winery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const winery = await WineryModel.create(req.body)
            res.json(winery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const winery = await WineryModel.update(req.params.id, req.body)
            res.json(winery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const winery = await WineryModel.delete(req.params.id)
            res.json(winery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}
export default new WineryController()