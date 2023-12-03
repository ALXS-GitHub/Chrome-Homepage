import './YouTubeSearchBar.css'
import React from 'react'

const YouTubeSearchBar = () => {
    return (
        <div className="youtube-search-bar">
            <form action="https://www.youtube.com/results" method="GET">
                <input type="text" name="search_query" className="youtube-search-bar__input" autocomplete="off" />
            </form>
        </div>
    )
}

export default YouTubeSearchBar