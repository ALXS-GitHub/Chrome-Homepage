import './PagesMenu.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as HomeLogo } from '../../icons/house-solid.svg'
import YouTubeLogo from '../../images/YouTube.png'

const PagesMenu = () => {

    const navigate = useNavigate();

    return (
        <div className="pages-menu">
            <div className="pages-menu__list">
                <div className="pages-menu__item link" onClick={() => navigate('/')} >
                    <div className="pages-menu__item__icon">
                        <HomeLogo />
                    </div>
                </div>
                <div className="pages-menu__item link" onClick={() => navigate('/YouTube')}>
                    <div className="pages-menu__item__icon">
                        <img src={YouTubeLogo} alt="YouTube" />
                    </div>
                    <div className="pages-menu__item__text">YouTube</div>
                </div>
            </div>
        </div>
    )

}

export default PagesMenu;