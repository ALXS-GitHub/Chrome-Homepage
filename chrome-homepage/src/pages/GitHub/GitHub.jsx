import './GitHub.css'
import React, { useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'

import { RightPanel } from '../../pages/Home'
import GitHubLeftPanel from './GitHubLeftPanel/GitHubLeftPanel'
import GitHubRightPanel from './GitHubRightPanel/GitHubRightPanel'

import { getUserRepos } from '../../services'

const GitHub = () => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        get('github-api-key').then(token => {
            get('github-user').then(username => {
                if (token && username) {
                    getUserRepos(username, token).then(repos => {
                        setRepos(repos);
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
        <div className="GitHub">
            <GitHubLeftPanel />
            <RightPanel content={<GitHubRightPanel />} />
        </div>
    )
}

export default GitHub;