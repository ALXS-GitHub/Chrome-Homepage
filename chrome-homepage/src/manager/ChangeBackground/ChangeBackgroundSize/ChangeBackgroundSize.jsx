import React from 'react'
import { get, set } from 'idb-keyval'

import { BackgroundContext } from '../../../App'
import { Select } from '../../../components'

const ChangeBackgroundSize = () => {

    const { background, setBackground } = React.useContext(BackgroundContext)
    const options = [{ value: 'cover', label: 'Cover' }, { value: 'contain', label: 'Contain' }, { value: 'auto', label: 'Auto' }]

    const handleBackgroundSizeChange = (value) => {
        const newBackground = {
            img: background.img,
            size: value
        }
        set('background', newBackground)
        setBackground(newBackground)
    }

    return (
        <div className="background-size">
            <Select options={options} onChange={handleBackgroundSizeChange} value={background.size.charAt(0).toUpperCase() + background.size.slice(1)} />
        </div>
    )
}

export default ChangeBackgroundSize