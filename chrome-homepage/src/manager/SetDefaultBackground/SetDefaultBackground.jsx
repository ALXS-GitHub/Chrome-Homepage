import './SetDefaultBackground.css'
import React from 'react'
import { get, set } from 'idb-keyval'

import { BackgroundContext } from '../../App'
import { Button } from '../../components'

import DefaultBackground from "../../images/background.jpg";

const SetDefaultBackground = () => {

    const { background, setBackground } = React.useContext(BackgroundContext)

    const handleSetDefaultBackground = () => {
        const newBackground = {
            img: DefaultBackground,
            size: 'cover'
        }
        set('background', newBackground)
        setBackground(newBackground)
    }

    return (
        <div className="set-default-background">
            <Button onClick={handleSetDefaultBackground} children={"Set Default Background"} size={2} />
        </div>
    )
}

export default SetDefaultBackground