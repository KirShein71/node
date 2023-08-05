import YearModel from '../models/Year.js'
import AppError from "../errors/AppError.js"

class YearController {
    async getAll(req, res, next) {
        try {
            const years = await YearModel.getAll()
            res.json(years)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const year = await YearModel.getOne(req.params.id)
            res.json(year)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const year = await YearModel.create(req.body)
            res.json(year)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const year = await YearModel.update(req.params.id, req.body)
            res.json(year)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id года')
            }
            const year = await YearModel.delete(req.params.id)
            res.json(year)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new YearController()