import './YouTube.css'
import React, { useState, useEffect } from 'react'

import { RightPanel } from '../../pages/Home'
import YouTubeLeftPanel from './YouTubeLeftPanel/YouTubeLeftPanel'
import YouTubeRightPanel from './YouTubeRightPanel/YouTubeRightPanel'

const YouTube = () => {

    return (
        <div className="YouTube">
            <YouTubeLeftPanel />
            <RightPanel content={<YouTubeRightPanel />} />
        </div>
    )
}

export default YouTube;