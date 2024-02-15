import './GitHubRightPanel.css'
import React from 'react'

import { GitHubSearchBar, SearchHistoryGitHub, PagesMenu } from '../../../components'

const GitHubRightPanel = () => {
    return (
        <div className="github-right-panel">
            <div className="github-right-panel__pages-menu">
                <PagesMenu />
            </div>
            <div className="github-right-panel__google-search-bar">
                {/* <GitHubSearchBar /> */}
            </div>
            <div className="github-right-panel__search-history">
                {/* <SearchHistoryGitHub /> */}
            </div>
        </div>
    );
}

export default GitHubRightPanel;