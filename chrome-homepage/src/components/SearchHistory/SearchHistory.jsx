/* global chrome */

import './SearchHistory.css'
import React, { useState, useEffect } from 'react'

import DefaultHistory from '../../documents/default_history.json'
import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg'


const SearchHistory = () => {

    const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

    const [history, setHistory] = useState(DefaultHistory);

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
                    maxResults: 500
                }).then(historyItems => {
                    const googleSearches = historyItems.filter(item => item.url.includes("https://www.google.com/search"));
                    const latestSearches = getTenMostRecentSearches(googleSearches);
                    setHistory(latestSearches);
                })
        } else {
            const latestSearches = getTenMostRecentSearches(DefaultHistory);
            setHistory(latestSearches);
        }
    }, [])

    const handleItemClick = (e, search) => {
        e.preventDefault();
        window.open(search.url, '_self');
    }

    return (
        <div className="search-history">
            <div className="search-history__list">
                {history.map((search, index) => (
                    <div className="search-history__list-item link" key={index} onClick={(e) => handleItemClick(e,search)}>
                        <div className="search-history__list-item-text">{search.title.replace(' - Recherche Google', '')}</div>
                        <div className="search-history__list-item-icon">
                            <SearchIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SearchHistory