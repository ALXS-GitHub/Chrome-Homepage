import './LeftPanel.css'
import React from 'react'
import { get } from 'idb-keyval'

import { LinkBox } from '../../../components'
import { SetDefaultLinks } from '../../../manager'


const LeftPanel = () => {

    const [links, setLinks] = React.useState([]);

    React.useEffect(() => {
        get('links').then((savedLinks) => {
            if (savedLinks) {
                setLinks(savedLinks);
            }
        });
    }, []);

    return (
        <div className="left-panel">
            <div className="left-panel__link-boxes">
                {links.map((link, index) => (
                    <div className="left-panel__link-boxes__box">
                        <LinkBox key={index} name={link.name} url={link.url} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftPanel;