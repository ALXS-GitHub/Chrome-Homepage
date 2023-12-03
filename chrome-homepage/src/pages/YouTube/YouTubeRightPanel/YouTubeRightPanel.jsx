import './YouTubeRightPanel.css'
import React from 'react'

import { YouTubeSearchBar, SearchHistoryYouTube, PagesMenu } from '../../../components'

const YouTubeRightPanel = () => {
    return (
        <div className="youtube-right-panel">
            <div className="youtube-right-panel__pages-menu">
                <PagesMenu />
            </div>
            <div className="youtube-right-panel__google-search-bar">
                <YouTubeSearchBar />
            </div>
            <div className="youtube-right-panel__search-history">
                <SearchHistoryYouTube />
            </div>
        </div>
    );
}

export default YouTubeRightPanel;