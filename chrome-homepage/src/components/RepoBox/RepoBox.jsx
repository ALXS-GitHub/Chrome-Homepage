import React from 'react';

import './RepoBox.css';

const RepoBox = ({ repo }) => {

    const onClick = () => {
        window.open(repo.html_url, '_blank');
    }

    return (
        <div className="repo link" onClick={onClick}>
            <div className="repo__header">
                <h2 className="repo__name">{repo.name}</h2>
                <p className="repo__visibility">{repo.private ? 'Private' : 'Public'}</p>
            </div>
            <p className="repo__description">{repo.description}</p>
            <div className="repo__details">
                <p className="repo__updated-at">Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                <p className="repo__language">Language: {repo.language}</p>
                <p className="repo__stars">Stars: {repo.stargazers_count}</p>
            </div>
        </div>
    )
}

export default RepoBox;