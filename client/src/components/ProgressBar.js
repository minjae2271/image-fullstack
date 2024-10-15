import React from 'react'
import './progressBar.css'

const ProgressBar = ({ percent }) => {
    return <div className='progress-boundary'>
        <div style={{ width: `${percent}%` }}>{percent}</div>
    </div>
}

export default ProgressBar