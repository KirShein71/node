import { Banner as BannerMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'

class Banner {
    async getAll() {
        const banners = await BannerMapping.findAll()
        return banners
    }
    
    async getOne(id) {
        const banner = await BannerMapping.findByPk(id)
        if (!banner) { 
            throw new Error('Товар не найден в БД')
        }
        return banner
    }

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const Banner = await BannerMapping.create({ image})
        
        const created = await BannerMapping.findByPk(Banner.id) 
        return created
    }

    async update(id, data, img) {
        const banner = await BannerMapping.findByPk(id)
        if (!banner) {
            throw new Error('Товар не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && Banner.image) {
            FileService.delete(banner.image)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            image = file ? file : banner.image
        } = data
        await banner.update({image})
        // обновим объект товара, чтобы вернуть свежие данные
        await banner.reload()
        return banner
    }

    async delete(id) {
        const banner = await BannerMapping.findByPk(id)
        if (!banner) {
            throw new Error('Товар не найден в БД')
        }
        if (banner.image) { // удаляем изображение товара
            FileService.delete(banner.image)
        }
        await banner.destroy()
        return banner
    }

}

export default new Banner()