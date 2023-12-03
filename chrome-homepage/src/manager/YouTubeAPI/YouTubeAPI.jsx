import './YouTubeAPI.css'
import React, { useEffect, useState, useRef } from 'react'
import { set, get } from 'idb-keyval'

import { Button } from '../../components'

const YouTubeAPI = () => {

    const [isAvailable, setIsAvailable] = useState(false)
    const apiRef = useRef()

    useEffect(() => {
        get('youtube-api-key').then((val) => {
            if (val) {
                setIsAvailable(true)
            }
        })
    }, [])

    const handleSave = () => {
        const key = apiRef.current.value
        if (!key) return
        set('youtube-api-key', key)
        setIsAvailable(true)
    }

    const handleDelete = () => {
        set('youtube-api-key', null)
        setIsAvailable(false)
    }
        
        return (
            <div className="youtube-api">
                {!isAvailable ? (
                    <div className="youtube-api__request">
                        <input type="text" placeholder="YouTube API key" ref={apiRef} />
                        <Button onClick={handleSave} children={"Save"} size={1} />
                    </div>
                ) : (
                    <div className="youtube-api__request">
                        <Button onClick={handleDelete} children={"Delete YT API key"} size={1} />
                    </div>
                )}
            </div>
        )
    }

export default YouTubeAPI