/* global chrome */

import './SearchHistoryYouTube.css'
import React, { useState, useEffect } from 'react'

import DefaultHistoryYouTube from '../../documents/default_history_youtube.json'
import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg'


const SearchHistoryYouTube = () => {

    const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

    const [history, setHistory] = useState(DefaultHistoryYouTube);

    const getTenMostRecentSearches = (searches) => {
        const uniqueSearches = searches.filter((search, index, self) =>
            index === self.findIndex((s) => (
                s.title === search.title
            ))
        );
        return uniqueSearches.slice(0, 10);
    }

    useEffect(() => {
        if (chrome.history) {
            chrome.history
                .search({
                    text: '',
                    startTime: kOneWeekAgo,
                    maxResults: 200
                }).then(historyItems => {
                    const youtubeSearches = historyItems.filter(item => item.url.includes("https://www.youtube.com/results"));
                    const latestSearches = getTenMostRecentSearches(youtubeSearches);
                    setHistory(latestSearches);
                })
        } else {
            const youtubeSearches = DefaultHistoryYouTube.filter(item => item.url.includes("https://www.youtube.com/results"));
            const latestSearches = getTenMostRecentSearches(youtubeSearches);
            setHistory(latestSearches);
        }
    }, [])

    const handleItemClick = (e, search) => {
        e.preventDefault();
        window.open(search.url, '_self');
    }

    return (
        <div className="search-history-youtube">
            <div className="search-history-youtube__list">
                {history.map((search, index) => (
                    <div className="search-history-youtube__list-item" key={index} onClick={(e) => handleItemClick(e, search)}>
                        <div className="search-history-youtube__list-item-text">{search.title.replace(' - YouTube', '').replace(/^\(\d+\)\s*/, '')}</div>
                        <div className="search-history-youtube__list-item-icon">
                            <SearchIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SearchHistoryYouTube