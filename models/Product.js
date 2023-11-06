import { Product as ProductMapping } from "./mapping.js";
import { ProductInfo as ProductInfoMapping} from "./mapping.js";
import { Category as CategoryMapping} from './mapping.js'
import { Winery as WineryMapping} from './mapping.js'
import { Year as YearMapping} from './mapping.js'
import { Brand as BrandMapping} from './mapping.js'
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'
import sequelize from "../sequelize.js";

class Product {
    async getAll(options) {
        const {categoryId, wineryId, yearId, brandId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        if (wineryId) where.wineryId = wineryId
        if (yearId) where.yearId = yearId
        if (brandId) where.brandId = brandId
        const products = await ProductMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {model: WineryMapping, as: 'winery'},
                {model: CategoryMapping, as: 'category'},
                {model: YearMapping, as: 'year'},
                {model: BrandMapping, as: 'brand'}
            ],
            order: [
                ['name', 'ASC'],
            ],
        })
        return products
    }


    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {model: ProductInfoMapping, as: 'props'},
                {model: WineryMapping, as: 'winery'},
                {model: CategoryMapping, as: 'category'},
                {model: YearMapping, as: 'year'},
                {model: BrandMapping, as: 'brand'}
            ]
        })
        if (!product) { 
            throw new Error('Товар не найден в БД')
        }
        return product
    }
   
    async searchByName(name, page = 1, pageSize = 32) {
        const offset = (page - 1) * pageSize;
        const query = 'SELECT * FROM products WHERE name ILIKE :name LIMIT :pageSize OFFSET :offset';
        const replacements = { name: `%${name}%`, pageSize, offset };
      
        try {
          const result = await sequelize.query(query, { replacements: replacements, type: sequelize.QueryTypes.SELECT  } );
          return result;
        } catch (error) {
          console.error('Error searching products:', error);
          throw error;
        }
      }
         

    

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const {name, price, categoryId = null, wineryId = null, yearId = null, brandId = null} = data
        const product = await ProductMapping.create({name, price, image, categoryId, wineryId, yearId, brandId})
        if (data.props) { // свойства товара
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductInfoMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        const created = await ProductMapping.findByPk(product.id, {
            include: [{model: ProductInfoMapping, as: 'props'}]
        })
        return created
    }

    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id, {
            include: [{model: ProductInfoMapping, as: 'props'}]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && product.image) {
            FileService.delete(product.image)
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = product.name,
            price = product.price,
            categoryId = product.categoryId,
            wineryId = product.wineryId,
            yearId = product.yearId,
            brandId = product.brandId,
            image = file ? file : product.image
        } = data
        await product.update({name, price, categoryId, image, wineryId, brandId, yearId})
        if (data.props) { // свойства товара
            // удаляем старые и добавляем новые
            await ProductInfoMapping.destroy({where: {productId: id}})
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductInfoMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        // обновим объект товара, чтобы вернуть свежие данные
        await product.reload()
        return product
    }

   

    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        if (product.image) { // удаляем изображение товара
            FileService.delete(product.image)
        }
        await product.destroy()
        return product
    }

    // TODO: это вообще используется?
    async isExist(id) {
        const basket = await ProductMapping.findByPk(id)
        return basket
    }
}

export default new Product()