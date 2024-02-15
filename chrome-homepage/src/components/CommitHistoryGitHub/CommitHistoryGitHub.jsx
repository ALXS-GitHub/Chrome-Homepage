/* global chrome */

import './CommitHistoryGitHub.css'
import React, { useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'
import { getLatestCommits } from '../../services'



const CommitHistoryGitHub = () => {

    const [commits, setCommits] = useState([])

    useEffect(() => {
        get('github-api-key').then(token => {
            get('github-user').then(username => {
                if (token && username) {
                    getLatestCommits(username, token).then(commits => {
                        console.log('commits:', commits);
                        setCommits(commits);
                    });
                } else {
                    console.log('No token or username');
                    console.log('token:', token);
                    console.log('username:', username);
                }
            });
        }
        );
    }, [])

    const onClick = (name, head) => {
        window.open("https://github.com/" + name + "/commit/" + head, '_blank');
    }


    return (
        <div className="commit-history">
            <div className="commit-history__list">
                {commits ? (
                    commits.map(commit => (
                        <div key={commit.id} onClick={() => onClick(commit.repo.name, commit.payload.head)} className="commit-history-item link">
                            <div className="commit-history-item__left">
                                <p className="commit-history-item__name">{commit.repo.name}</p>
                                <p className="commit-history-item__message">{commit.payload.commits[0].message}</p>
                            </div>
                            <div className="commit-history-time__right">
                                <p className="commit-history-item__author">Author: {commit.payload.commits[0].author.name}</p>
                                <p className="commit-history-item__date">Date: {new Date(commit.created_at).toLocaleDateString()}</p>
                            </div>

                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );

}

export default CommitHistoryGitHub