const route = require('express').Router()

route.use('/venders', require('./venders'))
route.use('/users', require('./users'))
route.use('/products', require('./products'))
route.use('/carts', require('./carts'))

exports = module.exports = {
    route
}
