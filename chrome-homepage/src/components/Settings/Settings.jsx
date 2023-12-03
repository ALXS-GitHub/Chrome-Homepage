import './Settings.css'
import React from 'react'
import { useState, useEffect } from 'react'

import { BackgroundContext } from '../../App'

import { SetDefaultLinks, DeleteAllLinks, SetDefaultBackground, ChangeBackground, ChangeBackgroundSize, YouTubeAPI } from '../../manager'
import { LinkList, AddLinkBox, Button } from '../../components'

const Settings = () => {

    const [addingLink, setAddingLink] = useState(false)
    const { background } = React.useContext(BackgroundContext)

    const handleAddLink = (e) => {
        e.stopPropagation()
        setAddingLink(true)
    }

    useEffect(() => {
        const handleDocumentClick = (e) => {
            const addLinkBoxElement = document.getElementById('add-link-box-element');
            if (!addLinkBoxElement.contains(e.target) && e.target !== addLinkBoxElement) {
                setAddingLink(false)
            }
        }
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [])

    return (
        <div className="settings">
            <div className="settings-container">
                <h1 className="settings-container__title">Settings</h1>
                <div className="settings-section">
                    <div className="settings-section__title">
                        Links
                    </div>
                    <div className="settings-section__item">
                        <LinkList />
                    </div>
                    <div id="add-link-box-element" className="settings-section__item">
                        {addingLink ? (
                            <AddLinkBox />
                        ) : (
                            <Button onClick={handleAddLink} children={"Add link"} size={2} />
                        )}
                    </div>
                    <div className="settings-section__item">
                        <SetDefaultLinks />
                        <DeleteAllLinks />
                    </div>
                </div>
                <div className="settings-section">
                    <div className="settings-section__item">
                        <SetDefaultBackground />
                        <ChangeBackground />
                        <ChangeBackgroundSize />
                    </div>
                </div>
                <div className="settings-section">
                    <div className="settings-section__title">
                        YouTube
                    </div>
                    <div className="settings-section__item">
                        <YouTubeAPI />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
