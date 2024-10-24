require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { imageRouter } = require('./routes/imageRouter')
const { userRouter } = require('./routes/userRouter')

const app = express()
const { MONGO_URL, PORT } = process.env

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('MongoDB Connected')

    app.use('/uploads', express.static('uploads'))
    app.use(express.json())
    
    app.use('/images', imageRouter)
    app.use('/users', userRouter)

    app.listen(PORT, () => console.log('Express listening on PORT' + PORT))
})
.catch((err) => console.log(err))
