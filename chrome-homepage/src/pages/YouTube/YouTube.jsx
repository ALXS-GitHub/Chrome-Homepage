import './YouTube.css'
import React, { useState, useEffect } from 'react'

import { RightPanel } from '../../pages/Home'
import YouTubeLeftPanel from './YouTubeLeftPanel/YouTubeLeftPanel'

const YouTube = () => {

    return (
        <div className="YouTube">
            <YouTubeLeftPanel />
            <RightPanel />
        </div>
    )
}

export default YouTube;