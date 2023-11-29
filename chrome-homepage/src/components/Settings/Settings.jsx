import './Settings.css'
import React from 'react'

import { SetDefaultLinks } from '../../manager'
import { LinkList } from '../../components'

const Settings = () => {
    return (
        <div className="settings">
            <div className="settings-container">
                <h1 className="settings-container__title">Settings</h1>
                <div className="settings-section">
                    <div className="settings-section__item">
                        <SetDefaultLinks />
                    </div>
                </div>
                <div className="settings-section">
                    <div className="settings-section__item">
                        <LinkList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
