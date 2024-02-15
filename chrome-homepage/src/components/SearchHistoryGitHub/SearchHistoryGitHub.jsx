/* global chrome */

import './SearchHistoryGitHub.css'
import React, { useState, useEffect } from 'react'

import DefaultHistoryGitHub from '../../documents/default_history_GitHub.json'
import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg'


const SearchHistoryGitHub = () => {

    const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

    const [history, setHistory] = useState(DefaultHistoryGitHub);

    // const getTenMostRecentSearches = (searches) => {
    //     const uniqueSearches = searches.filter((search, index, self) =>
    //         index === self.findIndex((s) => (
    //             s.title === search.title
    //         ))
    //     );
    //     return uniqueSearches.slice(0, 10);
    // }

    // useEffect(() => {
    //     if (chrome.history) {
    //         chrome.history
    //             .search({
    //                 text: '',
    //                 startTime: kOneWeekAgo,
    //                 maxResults: 500
    //             }).then(historyItems => {
    //                 const GitHubSearches = historyItems.filter(item => item.url.includes("https://www.github.com/results"));
    //                 const latestSearches = getTenMostRecentSearches(GitHubSearches);
    //                 setHistory(latestSearches);
    //             })
    //     } else {
    //         const GitHubSearches = DefaultHistoryGitHub.filter(item => item.url.includes("https://www.github.com/results"));
    //         const latestSearches = getTenMostRecentSearches(GitHubSearches);
    //         setHistory(latestSearches);
    //     }
    // }, [])

    const handleItemClick = (e, search) => {
        e.preventDefault();
        // window.open(search.url, '_self');
    }

    return (
        <div className="search-history-github">
            <div className="search-history-github__list">
                {history.map((search, index) => (
                    <div className="search-history-github__list-item link" key={index} onClick={(e) => handleItemClick(e, search)}>
                        <div className="search-history-github__list-item-text">{search.title.replace(' - github', '').replace(/^\(\d+\)\s*/, '')}</div>
                        <div className="search-history-github__list-item-icon">
                            <SearchIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SearchHistoryGitHub