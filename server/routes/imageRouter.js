const { Router } = require('express')
const imageRouter = Router()
const Image = require('../models/Image')
const { upload } = require('../middleware/imageUpload')

imageRouter.post('/upload', upload.single('image'), async (req, res) => {
    const image = await new Image({ key: req.file.filename, originalFileName: req.file.originalname}).save()
    res.json(image)
})
imageRouter.get('/images', async (req, res) => {
    const images = await Image.find()
    console.log(images)
    res.json(images)
})

module.exports = { imageRouter }