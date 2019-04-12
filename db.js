const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite', // mysql, postgres, mssql
    storage: __dirname + '/shopdb.db'
    // database : '',
    // host: 'localhost',
    // username: '',
    // password: '',
    // port: ''
})

const Vender = db.define('vender', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0.0
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

Product.belongsTo(Vender, { foreignKey: 'vender_id', targetKey: 'id', onDelete: 'CASCADE' });

/*
Code for self learning on belongsToMany
    const Cart = db.define("carts", {
    Pid: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    price: {
        type: Sequelize.INTEGER
    }
});
Product.belongsToMany(User, { through: 'cart' });
User.belongsToMany(Product, { through: 'cart' });
*/

const Cart = db.define('cart', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qty: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

Cart.belongsTo(Product, { foreignKey: "productId", targetKey: 'id', onDelete: 'CASCADE' });

db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    Vender, User, Product, Cart
}