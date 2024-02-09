import './LinkList.css'
import React from 'react'
import { set, get } from 'idb-keyval' // to use IndexedDB more easily
import { useState, useEffect } from 'react'
import { useRef } from 'react'

import { LinksContext } from '../../App'
import { ConfirmationDialog } from '../../manager'

import { ReactComponent as ModifyIcon } from '../../icons/pen-to-square-regular.svg'
import { ReactComponent as DeleteIcon } from '../../icons/trash-solid.svg'

const LinkList = () => {

    const { links, setLinks } = React.useContext(LinksContext)
    const [modified, setModified] = useState("")
    const nameRef = useRef()
    const urlRef = useRef()
    const imgRef = useRef()
    const [imgModif, setImgModif] = useState(null)
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [linkToDelete, setLinkToDelete] = useState(null)

    useEffect(() => {
        get('links').then(links => {
            setLinks(links || [])
        })
    }, [])

    // µ Modify
    const handleModify = (e, name) => {
        e.preventDefault();
        e.stopPropagation();
        if (modified === name) {
            const prevLink = links.find(link => link.name === name)
            const newLink = {
                name: nameRef.current.value,
                url: urlRef.current.value,
                img: imgModif || prevLink.img
            }
            saveModification(prevLink, newLink)
            setModified("")
            setImgModif(null)
        }
        else {
            setModified(name)
        }
    }

    // µ Delete
    const handleDelete = (name) => {
        const newLinks = links.filter(link => link.name !== name)
        setLinks(newLinks)
        set('links', newLinks)
        setModified("")
        setImgModif(null)
        setLinkToDelete(null)
        setShowConfirmationDialog(false)
    }

    // µ Image change
    const imgOnClick = (e) => {
        e.preventDefault()
        imgRef.current.click()
    }

    const handleImgChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setImgModif(reader.result)
        }
        reader.onerror = (error) => console.error(error)
        reader.readAsDataURL(file)
    }

    // µ Save modification
    const saveModification = (prevLink, newLink) => {
        const newLinks = [...links]
        const index = newLinks.indexOf(prevLink)
        newLinks[index] = newLink
        setLinks(newLinks)
        set('links', newLinks)
    }

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            handleModify(e, modified)
        }
    }

    // µ Confirmation dialog
    const toggleDeleteConfirmationDialog = (e, name) => {
        e.preventDefault()
        e.stopPropagation()
        setLinkToDelete(name)
        setShowConfirmationDialog(true)
    }

    // µ Drag and drop

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    const onDragStart = (e, name) => {
        e.dataTransfer.setData("name", name)
        dragItem.current = name
        console.log("drag start", name)
    }

    const onDragEnter = (e, name) => {
        e.preventDefault()
        dragOverItem.current = name
        console.log("drag enter", name)
    }

    const onDragEnd = (e) => {
        e.preventDefault()
        console.log("drag end")
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e) => {
        e.preventDefault()
        const name1 = dragItem.current
        const name2 = dragOverItem.current
        const newLinks = [...links]
        const index1 = newLinks.findIndex(link => link.name === name1)
        const index2 = newLinks.findIndex(link => link.name === name2)
        if (index1 < index2) {
            for (let i = index1; i < index2; i++) {
                const temp = newLinks[i]
                newLinks[i] = newLinks[i + 1]
                newLinks[i + 1] = temp
            }
        } else {
            for (let i = index1; i > index2; i--) {
                const temp = newLinks[i]
                newLinks[i] = newLinks[i - 1]
                newLinks[i - 1] = temp
            }
        }
        setLinks(newLinks)
        set('links', newLinks)
        console.log("drop")
    }

    // & document click
    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (!e.target.closest('#modif-item')) {
                setModified("")
                setImgModif(null)
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, []);

    return (
        <div className="linklist" onDrop={onDrop} onDragOver={onDragOver}>

            {/* confirmation dialog for delete */}
            {showConfirmationDialog ? (
                <ConfirmationDialog
                    message={"Are you sure you want to delete this link?"}
                    onConfirm={() => handleDelete(linkToDelete)}
                    onCancel={() => setShowConfirmationDialog(false)}
                />
            ) : null
            }

            {links.map((link, index) => (
                <div className="linklist__item link" draggable key={index} onDragStart={(e) => onDragStart(e,link.name)} onDragEnd={onDragEnd} onDragEnter={(e) => onDragEnter(e,link.name)}>
                    {modified === link.name ? (
                        <div id="modif-item" className="linklist__item__prop">
                            <img className="image-modif-hover" src={imgModif || link.img} alt={link.name} onClick={imgOnClick} />
                            <input type="text" defaultValue={link.name} ref={nameRef} onKeyDown={onEnter} />
                            <input type="text" defaultValue={link.url} ref={urlRef} onKeyDown={onEnter} />
                            <input type="file" ref={imgRef} style={{ display: 'none' }} onChange={handleImgChange} />
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
                        <div className="linklist__item__delete" onClick={(e) => toggleDeleteConfirmationDialog(e, link.name)}>
                            <DeleteIcon className="linklist__item__delete-icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LinkList