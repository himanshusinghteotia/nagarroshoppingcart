const Product = require('../../db').Product
const route = require('express').Router();

//fetch all products details from database and sending it to shop.js
route.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).send(products)
        }).catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

//add product in the product table
route.post('/', (req, res) => {
    // Validate the values
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: "Price is not valid number"
        })
    }
    Product.create({
        name: req.body.name,
        price: req.body.price,
        vender_id: req.body.vender_id,        
        quantity: req.body.quantity
    }).then((product) => {
        res.status(201).send(product)
    }).catch((error) => {
        res.status(501).send({
            error: "Error adding product"
        })
    })
})

//delete product from the product table
route.delete('/', (req, res) => {
    Product.destroy({
        where: {
            id: req.body.id
        }
    }).then((success) => {
        res.status(201).send("Product Deleted");
    }).catch((error) => {
        res.status(500).send("Error in deleting product");
    })
})

exports = module.exports = route