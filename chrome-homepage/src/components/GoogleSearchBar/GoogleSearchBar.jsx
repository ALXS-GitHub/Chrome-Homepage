import './GoogleSearchBar.css'
import React from 'react'

const GoogleSearchBar = () => {
    return (
        <div className="google-search-bar">
            <form action="https://www.google.com/search" method="GET">
                <input type="text" name="q" className="google-search-bar__input" autoComplete="off" />
            </form>
        </div>
    )
}

export default GoogleSearchBar