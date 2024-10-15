import React, { useState }  from 'react'
import axios from 'axios'
import './uploadForm.css'
import { toast } from 'react-toastify'
import ProgressBar from './ProgressBar'

const UploadForm = () => {
    const defaultFileName = 'please upload file'
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(defaultFileName)
    const [preview, setPreview] = useState(null)
    const [percent, setPercent] = useState(0)
    const imageSelectHandler = (e) => {
        const imageFile = e.target.files[0]
        setFile(imageFile)
        setFileName(imageFile.name)
        const fileReader = new FileReader()
        fileReader.readAsDataURL(imageFile)
        fileReader.onload = (e) => setPreview(e.target.result)

    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', file) //key - value pair
        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                hearders: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    setPercent(Math.round(100 * progressEvent.loaded / progressEvent.total))
                }
            })
            toast.success('success')
            setTimeout(() => {
                setPercent(0)
                setFileName(defaultFileName)
            }, 3000)
        } catch(err) {
            toast.error('fail')
            setPercent(0)
            setFileName(defaultFileName)
            console.log(err)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <img className='image-preview' src={preview} alt='preview' />
        <ProgressBar percent={percent} />
        <div className='image-dropper'>
            {fileName}
            <input id='image' type='file' onChange={imageSelectHandler} accept='image/*'/>
        </div>
        <button className='button' type='submit'>submit</button>
      </form>
    )
}

export default UploadForm