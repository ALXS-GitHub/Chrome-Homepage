import './HomeRightPanel.css'
import React from 'react'

import { GoogleSearchBar, SearchHistory, PagesMenu } from '../../../components'

const HomeRightPanel = () => {
    return (
        <div className="home-right-panel">
            <div className="home-right-panel__pages-menu">
                <PagesMenu />
            </div>
            <div className="home-right-panel__google-search-bar">
                <GoogleSearchBar />
            </div>
            <div className="home-right-panel__search-history">
                <SearchHistory />
            </div>
        </div>
    );
}

export default HomeRightPanel;