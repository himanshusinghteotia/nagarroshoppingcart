const User = require('../../db').User
const route = require('express').Router()

//fetch user details from database and sending it to shop.js
route.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive users"
            })
        })

})

//add user in the user table
route.post('/', (req, res) => {
    //send user details if already exists
    User.findOrCreate({
        where:{
            name: req.body.name
        }
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
})

exports = module.exports = route