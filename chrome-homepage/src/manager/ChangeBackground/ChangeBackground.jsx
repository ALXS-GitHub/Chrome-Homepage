import './ChangeBackground.css'
import React from 'react'
import { get, set } from 'idb-keyval'
import { useRef } from 'react'

import { BackgroundContext } from '../../App'
import { Button } from '../../components'

const ChangeBackground = () => {
    
        const { background, setBackground } = React.useContext(BackgroundContext)
        const imgRef = useRef()
    
        const onClick = (e) => {
            e.preventDefault()
            imgRef.current.click();
        }

        const handleImgChange = (e) => {
            e.preventDefault()
            const file = e.target.files[0]
            console.log("file : ", file)
            if (!file) {
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                const newBackground = {
                    img: reader.result,
                    size: background.size
                }
                set('background', newBackground)
                setBackground(newBackground)
            }
            reader.onerror = (error) => console.error(error)
            reader.readAsDataURL(file)
        }
    
        return (
            <div className="change-background">
                <Button onClick={onClick} children={"Change Background"} size={2} />
                <input type="file" ref={imgRef} style={{ display: 'none' }} onChange={handleImgChange} />
            </div>
        )
    }

export default ChangeBackground