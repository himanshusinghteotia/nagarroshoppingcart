const Cart = require('../../db').Cart
const Product = require('../../db').Product
const route = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op

//fetch products details in logged in user cart from database and sending it to shop.js
route.get('/', (req, res) => {
	Cart.findAll({
		where: {
			userId: parseInt(req.query.user_id)
		},
		include: [
			{ model: Product }
		]
	})
		.then((carts) => {
			res.status(200).send(carts)
		})
		.catch((err) => {
			res.status(500).send({
				error: "Could not retrieve products"
			})
		})
})

//add item in the cart and increment the quantity if already exists for the logged in user
route.post('/', (req, res) => {
	Cart.findOne({
		where: {
			[Op.and]: [
				{
					productId: req.body.productId,
					userId: req.body.userId
				}
			]
		}
	}).then(cartProduct => {
		if (!cartProduct) {
			Cart.create({
				productId: req.body.productId,
				userId: req.body.userId,
			}).then((cart) => {
				res.status(200).send(cart)
			}).catch((error) => {
				res.status(500).send({
					error: console.log(error)
				})
			})
		} else {
			cartProduct.increment("qty").then(product => {
				res.send(product);
			});
		}
	})
})

exports = module.exports = route