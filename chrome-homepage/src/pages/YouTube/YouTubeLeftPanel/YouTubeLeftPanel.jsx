import './YouTubeLeftPanel.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { get } from 'idb-keyval'
import axios from 'axios'

const YouTubeLeftPanel = () => {

    const [YTAPIKey, setYTAPIKey] = useState(null)
    const [video, setVideo] = useState(null)

    useEffect(() => {
        get('youtube-api-key').then((val) => {
            setYTAPIKey(val);
            console.log('YouTube API key', val)

            // Get the latest video from the "Watch Later" playlist
            const response = axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PL8ZQ0tYlxX4HKf6MV1H2dy4JKsxmLLflQ&key=${val}`)
            .then((response) => {
                if (response.data.items.length === 0) return
                console.log(response.data)
                setVideo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        });
    }, []);
    
    return (
        <div className="youtube-left-panel">
            {video ? (
                <iframe
                    className="youtube-left-panel__video"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            ) : null}
            
        </div>
    )
}

export default YouTubeLeftPanel;