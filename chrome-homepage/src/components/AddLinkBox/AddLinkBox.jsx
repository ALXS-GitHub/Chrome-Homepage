import './AddLinkBox.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { set, get } from 'idb-keyval' // to use IndexedDB more easily

import { LinksContext } from '../../App'

import { ReactComponent as AddIcon } from '../../icons/check-solid.svg'
import DefaultImage from '../../images/DefaultImage.png'

const AddLinkBox = () => {
    const { links, setLinks } = React.useContext(LinksContext);
    const nameRef = useRef();
    const imgRef = useRef();
    const urlRef = useRef();
    const [img, setImg] = useState(null)

    // get the links from the database
    useEffect(() => {
        get('links').then((savedLinks) => {
            if (savedLinks) {
                setLinks(savedLinks);
            }
        });
    }, []);

    const handleUpload = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const file = imgRef.current.files[0];
        const url = urlRef.current.value;
        const reader = new FileReader();
        if (!file) {
            const link = { name, url, img: img || DefaultImage};
            const newLinks = [...links, link];
            setLinks(newLinks);
            set('links', newLinks);
            return;
        }
        reader.onloadend = () => {
            const link = { name, url, img: img || DefaultImage};
            const newLinks = [...links, link];
            setLinks(newLinks);
            set('links', newLinks);
        };
        reader.onerror = (error) => console.error(error);
        reader.readAsDataURL(file);
    };

    const imgOnClick = (e) => {
        e.preventDefault()
        imgRef.current.click()
    }

    const handleImgChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setImg(reader.result)
        }
        reader.onerror = (error) => console.error(error)
        reader.readAsDataURL(file)
    }

    return (
        <div className="add-link-box">
            <form className="add-link-box__item" onSubmit={handleUpload}>
                <div className="add-link-box__item__prop">
                    <img className="image-modif-hover link" src={img || DefaultImage} alt="Default" onClick={imgOnClick} />
                    <input type="text" ref={nameRef} placeholder="Name" />
                    <input type="text" ref={urlRef} placeholder="Url" />
                    <input type="file" ref={imgRef} style={{ display: 'none' }} onChange={handleImgChange} />
                </div>
                <div className="add-link-box__item__buttons">
                    <button className="add-link-box__item__submit" type="submit">
                        <AddIcon />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddLinkBox