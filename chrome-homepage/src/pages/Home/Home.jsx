import './Home.css'
import React from 'react'
import { CSSTransition } from 'react-transition-group'

import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import { Settings } from '../../components'

import SettingsButtonIcon from '../../images/settings-button.png'

const Home = () => {

    const [settingsOpen, setSettingsOpen] = React.useState(false)

    const toggleSettings = (e) => {
        e.preventDefault()
        setSettingsOpen(!settingsOpen)
    }

    return (
        <div className="home">
            <LeftPanel />
            <RightPanel />
            <CSSTransition
                in={settingsOpen}
                timeout={3000}
                classNames="settings-transition"
                unmountOnExit
            >
                <Settings />
            </CSSTransition>
            <div className="home__settings-button" onClick={toggleSettings}>
                <CSSTransition
                    in={settingsOpen}
                    timeout={3000}
                    classNames="settings-button-transition"
                >
                    <img src={SettingsButtonIcon} alt="Settings" />
                </CSSTransition>
            </div>
        </div>
    )
}

export default Home