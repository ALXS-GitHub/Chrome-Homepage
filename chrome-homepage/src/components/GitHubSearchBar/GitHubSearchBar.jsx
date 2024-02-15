import './GitHubSearchBar.css'
import React from 'react'

const GitHubSearchBar = () => {
    return (
        <div className="github-search-bar">
            <form action="https://www.github.com/results" method="GET">
                <input type="text" name="search_query" className="github-search-bar__input" autoComplete="off" />
            </form>
        </div>
    )
}

export default GitHubSearchBar