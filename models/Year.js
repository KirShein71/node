import { Year as YearMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";


class Year {
    async getAll() {
        const years = await YearMapping.findAll()
        return years
    }

    async getOne(id) {
        const year = await YearMapping.findByPk(id)
        if (!year) {
            throw new Error('Год не найден в БД')
        }
        return year
    }

    async create(data) {
        const {name} = data
        const year = await YearMapping.create({name})
        return year
    }

    async update(id, data) {
        const year = await YearMapping.findByPk(id)
        if (!year) {
            throw new Error('Год не найден в БД')
        }
        const {name = year.name} = data
        await year.update({name})
        return year
    }

    async delete(id) {
        const year = await YearMapping.findByPk(id)
        if (!year) {
            throw new Error('Год не найден в БД')
        }
        await year.destroy()
        return year
    }
}

export default new Year()