import './GitHub.css'
import React, { useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'

import { RightPanel } from '../../pages/Home'
import GitHubLeftPanel from './GitHubLeftPanel/GitHubLeftPanel'
import GitHubRightPanel from './GitHubRightPanel/GitHubRightPanel'

const GitHub = () => {

    return (
        <div className="GitHub">
            <GitHubLeftPanel />
            <RightPanel content={<GitHubRightPanel />} />
        </div>
    )
}

export default GitHub;