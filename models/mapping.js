import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },


})

const BasketProduct = sequelize.define('basket_product', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
})

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: false },
})

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    place: { type: DataTypes.STRING, unique: true, allowNull: false },
    link: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, unique: true, allowNull: false },
    responsible: {type: DataTypes.STRING, unique: true, allowNull: false},
    date: {type: DataTypes.STRING, unique: true, allowNull: false},
    image: { type: DataTypes.STRING, allowNull: false },
})


const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Winery = sequelize.define('winery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Year = sequelize.define('year', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// связь между товаром и пользователем через промежуточную таблицу «rating»
// у этой таблицы будет составной первичный ключ (product_id + user_id)
const Rating = sequelize.define('rating', {
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false }
})



const CategoryWinery = sequelize.define('category_winery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const CategoryYear = sequelize.define('category_year', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const WineryYear = sequelize.define('winery_year', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

const OrderItem = sequelize.define('order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
})


Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })



// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)



// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Category.hasMany(Product, { onDelete: 'RESTRICT' })
Product.belongsTo(Category)



Brand.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Brand)



// связь бренда с товарами: у бренда может быть много товаров, но каждый товар
// может принадлежать только одному бренду
Winery.hasMany(Product, { onDelete: 'RESTRICT' })
Product.belongsTo(Winery)

Year.hasMany(Product, { onDelete: 'RESTRICT' })
Product.belongsTo(Year)
// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров
Product.belongsToMany(User, { through: Rating, onDelete: 'CASCADE' })
User.belongsToMany(Product, { through: Rating, onDelete: 'CASCADE' })



// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
Product.hasMany(Rating)
Rating.belongsTo(Product)
User.hasMany(Rating)
Rating.belongsTo(User)




// связь товара с его свойствами: у товара может быть несколько свойств, но
// каждое свойство связано только с одним товаром
Product.hasMany(ProductInfo, { as: 'props', onDelete: 'CASCADE' })
ProductInfo.belongsTo(Product)






Category.belongsToMany(Winery, {through: CategoryWinery })
Winery.belongsToMany(Category, {through: CategoryWinery })

Category.belongsToMany(Year, {through: CategoryYear })
Year.belongsToMany(Category, {through: CategoryYear })
Winery.belongsToMany(Year, {through: WineryYear })
Year.belongsToMany(Winery, {through: WineryYear })

// связь заказа с позициями: в заказе может быть несколько позиций, но
// каждая позиция связана только с одним заказом
Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE' })
OrderItem.belongsTo(Order)

// связь заказа с пользователями: у пользователя может быть несколько заказов,
// но заказ может принадлежать только одному пользователю
User.hasMany(Order, { as: 'orders', onDelete: 'SET NULL' })
Order.belongsTo(User)

export {
    User,
    Basket,
    Product,
 
    Category,
    Winery,
    Year,
    Rating,
    BasketProduct,
    ProductInfo,
    Order,
    OrderItem,
    WineryYear,
    CategoryWinery,
    CategoryYear,
    Brand,
    Event,
   
    
}