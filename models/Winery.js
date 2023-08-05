import { Winery as WineryMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";

    class Winery {
        async getAll() {
            const wineries = await WineryMapping.findAll()
            return wineries
        }
    
        async getOne(id) {
            const winery = await WineryMapping.findByPk(id)
            if (!winery) {
                throw new Error('Год не найден в БД')
            }
            return winery
        }
    
        async create(data) {
            const {name, description} = data
            const winery = await WineryMapping.create({name, description})
            return winery
        }
    
        async update(id, data) {
            const winery = await WineryMapping.findByPk(id)
            if (!winery) {
                throw new Error('Год не найден в БД')
            }
            const {name = winery.name} = data
            await winery.update({name})
            return winery
        }
    
        async delete(id) {
            const winery = await WineryMapping.findByPk(id)
            if (!winery) {
                throw new Error('Год не найден в БД')
            }
            await winery.destroy()
            return winery
        }
    }


export default new Winery()