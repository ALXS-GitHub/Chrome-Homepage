import './RightPanel.css'
import React from 'react'

import { GoogleSearchBar, SearchHistory } from '../../../components'

const RightPanel = () => {
    return (
        <div className="right-panel">
            <div className="right-panel__google-search-bar">
                <GoogleSearchBar />
            </div>
            <div className="right-panel__search-history">
                <SearchHistory />
            </div>
        </div>
    );
}

export default RightPanel;