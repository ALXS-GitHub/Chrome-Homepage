/* global chrome */
import './YouTubeLeftPanel.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { get, set } from 'idb-keyval'
import axios from 'axios'

import DefaultHistoryYouTube from '../../../documents/default_history_youtube.json'
import YouTubeLogo from '../../../images/YouTube.png'

const YouTubeLeftPanel = () => {

    const [video, setVideo] = useState(null)
    const [videoSnippet, setVideoSnippet] = useState(null)

    const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

    useEffect(() => {
        get('youtube-api-key').then(val => {
            if (val) {
                if (!video) return
                const id = video.url.split("watch?v=")[1]
                const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${val}`
                axios.get(url)
                    .then(res => {
                        console.log(res)
                        return res.data.items[0].snippet
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .then(snippet => {
                        if (snippet) {
                            setVideoSnippet(snippet)
                        }
                    })
            }
        }
        )
    }, [video])

    const getMostRecentVideo = (searches) => {
        return searches[0];
    }

    useEffect(() => {
        if (chrome.history) {
            chrome.history
                .search({
                    text: '',
                    startTime: kOneWeekAgo,
                    maxResults: 200
                }).then(historyItems => {
                    const youtubeSearch = historyItems.filter(item => item.url.includes("https://www.youtube.com/watch"));
                    const latestSearch = getMostRecentVideo(youtubeSearch);
                    setVideo(latestSearch);
                    console.log(latestSearch)
                })
        } else {
            const latestSearch = getMostRecentVideo(DefaultHistoryYouTube);
            setVideo(latestSearch);
            console.log(latestSearch)
        }
    }, [])

    const onClick = () => {
        if (video) {
            window.open(video.url, '_self');
        }
    }

    return (
        <div className="youtube-left-panel">

            {video && videoSnippet ? (
                <div className="youtube-left-panel__video">
                    <div className="youtube-left-panel__video__thumbnail" onClick={onClick}>
                        <img src={videoSnippet.thumbnails.maxres ? videoSnippet.thumbnails.maxres.url : videoSnippet.thumbnails.high.url} alt="thumbnail"/>
                        <img src={YouTubeLogo} alt="logo" className="youtube-left-panel__video__logo" />
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default YouTubeLeftPanel;