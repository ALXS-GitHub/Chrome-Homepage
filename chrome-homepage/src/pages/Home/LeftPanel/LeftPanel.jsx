import './LeftPanel.css'
import React from 'react'
import { get, set } from 'idb-keyval'
import { useState, useEffect } from 'react'

import { LinksContext } from '../../../App'
import { LinkBox } from '../../../components'


const LeftPanel = () => {

    const { links, setLinks } = React.useContext(LinksContext)

    useEffect(() => {
        get('links').then(links => {
            setLinks(links || [])
        })
    }, [setLinks])

    console.log(links)

    return (
        <div className="left-panel">
            <div className="left-panel__link-boxes">
                {links.map((link, index) => (
                    <div className="left-panel__link-boxes__box">
                        <LinkBox key={index} link={link} name={link.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftPanel;