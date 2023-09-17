import { Event as EventMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'

class Event {
    async getAll() {
        const events = await EventMapping.findAll()
        return events
    }
    
    async getOne(id) {
        const event = await EventMapping.findByPk(id)
        if (!event) { 
            throw new Error('Товар не найден в БД')
        }
        return event
    }

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const {name, place, link, description, date, responsible, whatsapp, telegram} = data
        const event = await EventMapping.create({name, place, link, description, date, responsible, image, whatsapp, telegram})
        
        const created = await EventMapping.findByPk(event.id) 
        return created
    }

    async update(id, data, img) {
        const event = await EventMapping.findByPk(id)
        if (!event) {
            throw new Error('Товар не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && event.image) {
            FileService.delete(event.image)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = event.name,
            place = event.price,
            link = event.link,
            description = event.description,
            date = event.date,
            responsible = event.responsible,
            whatsapp = event.whatsapp,
            telegram = event.telegram,
            image = file ? file : event.image
        } = data
        await event.update({name, place, link, description, date, responsible, image, whatsapp, telegram})
        // обновим объект товара, чтобы вернуть свежие данные
        await event.reload()
        return event
    }

    async delete(id) {
        const event = await EventMapping.findByPk(id)
        if (!event) {
            throw new Error('Товар не найден в БД')
        }
        if (event.image) { // удаляем изображение товара
            FileService.delete(event.image)
        }
        await event.destroy()
        return event
    }

}

export default new Event()