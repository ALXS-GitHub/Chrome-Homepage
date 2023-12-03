/* global chrome */
import './YouTubeLeftPanel.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { get, set } from 'idb-keyval'
import axios from 'axios'

import DefaultHistoryYouTube from '../../../documents/default_history_youtube.json'

const YouTubeLeftPanel = () => {

    const [video, setVideo] = useState(null)
    const playerRef = useRef()

    const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

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
                    const latestSearch = getMostRecentVideo(DefaultHistoryYouTube);
                    setVideo(latestSearch);
                    console.log(latestSearch)
                })
        } else {
            const latestSearch = getMostRecentVideo(DefaultHistoryYouTube);
            setVideo(latestSearch);
            console.log(latestSearch)
        }
    }, [])

    useEffect(() => {
        // Function to create a new YouTube player
        const createPlayer = () => {
            console.log("player created")
            if (!video) return;
            new window.YT.Player(playerRef.current, {
                videoId: video.url.replace('https://www.youtube.com/watch?v=', ''),
                events: {
                    'onReady': (event) => {
                        // ! change this parameter to autoplay
                        // Play the video when the player is ready
                        // event.target.playVideo();
                    }
                }
            });
        };

        // Create a new YouTube player when the API is ready
        if (window.YT && window.YT.Player) {
            // The YouTube Player API is already loaded, create the player immediately
            createPlayer();
        } else {
            // The YouTube Player API is not loaded yet, set the onYouTubeIframeAPIReady function
            window.onYouTubeIframeAPIReady = createPlayer;
        }
    }, [video, setVideo]);
    
    return (
        <div className="youtube-left-panel">
            <div ref={playerRef} className="youtube-left-panel__video"></div>
        </div>
    )
}

export default YouTubeLeftPanel;