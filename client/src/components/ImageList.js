import React, { useContext } from 'react'
import { ImageContext } from '../context/ImageContext'

const ImageList = () => {
    const [images] = useContext(ImageContext)
    if(!images) {
        return null
    }

    return <div>
        {images.map((image) => <img key={image.key} style={{ width: '100%' }} src={`http://localhost:5000/uploads/${image.key}`} />)}
    </div>
}

export default ImageList