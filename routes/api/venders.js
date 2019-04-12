const Vender = require('../../db').Vender
const Product = require('../../db').Product
const route = require('express').Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//fetch venders details from database and sending it to shop.js
route.get('/', (req, res) => {
    Vender.findAll()
        .then((venders) => {
            res.status(200).send(venders)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

//add vender in the vendor table
route.post('/', (req, res) => {
    Vender.create({
        name: req.body.name,
    }).then((vender) => {
        res.status(201).send(vender)
    }).catch((error) => {
        res.status(501).send({
            error: "Error adding vender"
        })
    })
})

//delete vender from the vendor table
route.delete('/', (req, res) => {
    Vender.destroy({
        where: {
            id: req.body.id
        }
    }).then((success) => {
        /*
        Product.destroy({
             where: {
                 venderId:null
             }
        })
        */
        res.status(201).send("Vender Deleted");
    }).catch((error) => {
        res.status(500).send("Error in deleting vender");
    })
})

exports = module.exports = route