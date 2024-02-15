import React, { useEffect, useState } from 'react'
import { set, get } from 'idb-keyval'

import './GitHubLeftPanel.css'
import { getUserRepos } from '../../../services'
import { RepoBox } from '../../../components'

const GitHubLeftPanel = () => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        get('github-api-key').then(token => {
            get('github-user').then(username => {
                if (token && username) {
                    getUserRepos(username, token).then(repos => {
                        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                        setRepos(repos);
                        console.log('repos:', repos);
                    });
                } else {
                    console.log('No token or username');
                    console.log('token:', token);
                    console.log('username:', username);
                }
            });
        });
    }, []);
    
    return (
        <div className="github-left-panel">
            <div className="github-left-panel__container">
                {repos.map(repo => (
                    <RepoBox key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
    }

export default GitHubLeftPanel;