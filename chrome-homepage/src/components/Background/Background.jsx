import './Background.css'
import React from 'react'
import { get, set } from 'idb-keyval'
import { useEffect } from 'react'

import { BackgroundContext } from '../../App'
import DefaultBackground from '../../images/background.jpg'

const Background = () => {
    
        const { background, setBackground } = React.useContext(BackgroundContext)
    
        useEffect(() => {
            get('background').then(background => {
                setBackground(background || DefaultBackground)
            })
        }, [setBackground])
    
        return (
            <div className="background" style={{ backgroundImage: `url(${background.img})`, backgroundSize: `${background.size}` }} />
        )
    }

export default Background