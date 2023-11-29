import React from 'react'
import { set, get } from 'idb-keyval' // to use IndexedDB more easily
import { useEffect } from 'react'

import GitHub from '../../images/linkbox/GitHub.png'
import YouTube from '../../images/linkbox/YouTube.png'
import ChatGPT from '../../images/linkbox/Chat GPT.png'
import Twitch from '../../images/linkbox/Twitch.png'
import Gmail from '../../images/linkbox/Gmail.png'
import DailyRewards from '../../images/linkbox/Daily Rewards.png'
import MonkeyType from '../../images/linkbox/MonkeyType.png'
import GoogleDrive from '../../images/linkbox/Google Drive.png'

import { Button } from '../../components'

import { LinksContext } from '../../App'

const defaultLinks = [
    { name: 'GitHub', url: 'https://github.com', img: GitHub },
    { name: 'YouTube', url: 'https://youtube.com', img: YouTube },
    { name: 'Chat GPT', url: 'https://chat.openai.com/', img: ChatGPT },
    { name: 'Twitch', url: 'https://twitch.tv', img: Twitch },
    { name: 'Gmail', url: 'https://mail.google.com', img: Gmail },
    { name: 'Daily Rewards', url: 'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&mhy_auth_required=true&mhy_presentation_style=fullscreen&utm_source=tools&lang=fr-fr&bbs_theme=dark&bbs_theme_device=1', img: DailyRewards },
    { name: 'MonkeyType', url: 'https://monkeytype.com', img: MonkeyType },
    { name: 'Google Drive', url: 'https://drive.google.com', img: GoogleDrive },
]

const SetDefaultLinks = () => {

    const { links, setLinks } = React.useContext(LinksContext);

    const handleClick = () => {
        const previousLinks = get('links').then(previousLinks => {
            previousLinks = previousLinks || []; // If previousLinks is null or undefined, use an empty array
            const newLinks = [...previousLinks];

            for (const defaultLink of defaultLinks) {
                if (!newLinks.some(link => link.name === defaultLink.name && link.url === defaultLink.url)) {
                    newLinks.push(defaultLink);
                }
            }
            if (JSON.stringify(newLinks) !== JSON.stringify(previousLinks)) {
                setLinks(newLinks);
                set('links', newLinks);
            }
        });
    }

    return (
        <div>
            <Button
                onClick={handleClick}
                children={"Set default links"}
            />
        </div>
    )
}

export default SetDefaultLinks