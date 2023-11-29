import './LeftPanel.css'
import React from 'react'
import { get } from 'idb-keyval'
import { useState, useEffect } from 'react'

import { LinkBox } from '../../../components'
import { SetDefaultLinks } from '../../../manager'


const LeftPanel = () => {

    const [links, setLinks] = React.useState([]);

    useEffect(() => {
        get('links').then(links => {
            setLinks(links || [])
        })
    }, [])

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