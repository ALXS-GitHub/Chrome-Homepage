import './GitHubAPI.css'
import React, { useEffect, useState, useRef } from 'react'
import { set, get } from 'idb-keyval'

import { Button } from '../../components'

const GitHubAPI = () => {

    const [isAvailable, setIsAvailable] = useState(false)
    const [user, setUser] = useState(null)
    const userRef = useRef()
    const apiRef = useRef()

    useEffect(() => {
        get('github-api-key').then((val) => {
            if (val) {
                setIsAvailable(true)
            }
        })
        get('github-user').then((val) => {
            if (val) {
                setUser(val)
            }
        })
    }, [])

    const handleSaveAPI = () => {
        const key = apiRef.current.value
        if (!key) return
        set('github-api-key', key)
        setIsAvailable(true)
    }

    const handleDeleteAPI = () => {
        set('github-api-key', null)
        setIsAvailable(false)
    }

    const handleSaveUser = () => {
        const username = userRef.current.value
        if (!username) return
        set('github-user', username)
        setUser(username)
    }

    const handleDeleteUser = () => {
        set('github-user', null)
        setUser(null)
    }
        
        return (
            <div className="github-api">

                {!user ? (
                    <div className="github-user">
                        <input type="text" placeholder="GitHub username" ref={userRef} />
                        <Button onClick={handleSaveUser} children={"Save"} size={1} />
                    </div>
                ) : (
                    <div className="github-user">
                        <Button onClick={handleDeleteUser} children={"Delete GH user"} size={1} />
                    </div>
                )}

                {!isAvailable ? (
                    <div className="github-api__request">
                        <input type="text" placeholder="GitHub API key" ref={apiRef} />
                        <Button onClick={handleSaveAPI} children={"Save"} size={1} />
                    </div>
                ) : (
                    <div className="github-api__request">
                        <Button onClick={handleDeleteAPI} children={"Delete GH API key"} size={1} />
                    </div>
                )}
            </div>
        )
    }

export default GitHubAPI