import './LinkList.css'
import React from 'react'
import { set, get } from 'idb-keyval' // to use IndexedDB more easily
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import { ReactComponent as ModifyIcon } from '../../icons/pen-to-square-regular.svg'

const LinkList = () => {

    const navigate = useNavigate()
    const [links, setLinks] = useState([])
    const [modified, setModified] = useState("")
    const [modifiedLink, setModifiedLink] = useState({})
    const nameRef = useRef()
    const urlRef = useRef()

    useEffect(() => {
        get('links').then(links => {
            setLinks(links || [])
        })
    }, [])

    const handleModify = (e, name) => {
        e.preventDefault();
        if (modified === name) {
            const prevLink = links.find(link => link.name === name)
            const newLink = {
                name: nameRef.current.value,
                url: urlRef.current.value,
                img: prevLink.img
            }
            saveModification(prevLink, newLink)
            setModified("")
        }
        else {
            setModified(name)
        }
    }

    const saveModification = (prevLink, newLink) => {
        const newLinks = [...links]
        const index = newLinks.indexOf(prevLink)
        newLinks[index] = newLink
        setLinks(newLinks)
        set('links', newLinks)
    }

    return (
        <div className="linklist">
            {links.map((link, index) => (
                <div className="linklist__item" key={index}>
                    {modified === link.name ? (
                        <div className="linklist__item__prop">
                            <img src={link.img} alt={link.name} />
                            <input type="text" defaultValue={link.name} ref={nameRef} />
                            <input type="text" defaultValue={link.url} ref={urlRef} />
                        </div>
                    ) : (
                        <div className="linklist__item__prop">
                            <img src={link.img} alt={link.name} />
                            <p>{link.name}</p>
                            <p>{link.url}</p>
                        </div>
                    )}
                    <div className="linklist__item__buttons">
                        <div className="linklist__item__modify" onClick={(e) => handleModify(e, link.name)} >
                            <ModifyIcon className="linklist__item__modify-icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LinkList