import './Home.css'
import React from 'react'
import { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { get, set } from 'idb-keyval'

import { BackgroundContext } from '../../App'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import { Settings, Background } from '../../components'

import DefaultBackground from "../../images/background.jpg";
import SettingsButtonIcon from '../../images/settings-button.png'

const Home = () => {

    const { background, setBackground } = React.useContext(BackgroundContext)
    const [settingsOpen, setSettingsOpen] = React.useState(false)

    useEffect(() => {
        get('background').then(background => {
            const defaultBackground = {
                img: DefaultBackground,
                size: 'cover'
            }
            setBackground(background || defaultBackground)
        })
    }, [setBackground])

    const toggleSettings = (e) => {
        e.preventDefault()
        setSettingsOpen(!settingsOpen)
    }

    return (
        <div className="home">
            <Background />
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