const { Router } = require('express')
const userRouter = Router()
const  User  = require('../models/User')

userRouter.post('/register', ( req, res ) => {
    const user = new User(req.body).save()
    res.json({ message: 'register connected'})
})

module.exports = { userRouter }