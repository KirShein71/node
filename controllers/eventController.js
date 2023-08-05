import EventModel from '../models/Event.js'
import AppError from '../errors/AppError.js'

class EventController {
    async getAll(req, res, next) {
        try {
            const event = await EventModel.getAll()
            res.json(event)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const event = await EventModel.getOne(req.params.id)
            res.json(event)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const event = await EventModel.create(req.body, req.files?.image)
            res.json(event)
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
            const event = await EventModel.update(req.params.id, req.body, req.files?.image)
            res.json(event)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const event = await EventModel.delete(req.params.id)
            res.json(event)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new EventController()