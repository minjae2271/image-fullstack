require('dotenv').config()
const express = require('express')
const multer = require('multer')
const { v4: uuid } = require('uuid')
const mime = require('mime-types')
const mongoose = require('mongoose')
const Image = require('./models/image')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads') ,
    filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if(['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true)
        else cb(new Error('invalid file type.'), false)
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

const app = express()
const PORT = 5000

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected')

    app.use('/uploads', express.static('uploads'))
    
    app.post('/upload', upload.single('image'), async (req, res) => {
        const image = await new Image({ key: req.file.filename, originalFileName: req.file.originalname}).save()
        res.json(image)
    })
    app.get('/images', async (req, res) => {
        const images = await Image.find()
        console.log(images)
        res.json(images)
    })
    app.listen(PORT, () => console.log('Express listening on PORT' + PORT))
})
.catch((err) => console.log(err))
