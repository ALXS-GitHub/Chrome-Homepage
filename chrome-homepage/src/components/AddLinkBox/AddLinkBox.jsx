import './AddLinkBox.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { set, get } from 'idb-keyval' // to use IndexedDB more easily

const AddLinkBox = () => {
    const [links, setLinks] = useState([]);
    const nameRef = useRef();
    const fileRef = useRef();
    const urlRef = useRef();

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
        const file = fileRef.current.files[0];
        const url = urlRef.current.value;
        const reader = new FileReader();
        reader.onloadend = () => {
            const link = { name, url, img: reader.result };
            const newLinks = [...links, link];
            setLinks(newLinks);
            set('links', newLinks);
        };
        reader.onerror = (error) => console.error(error);
        reader.readAsDataURL(file);
    };

    return (
        <div className="add-link-box">
            <form onSubmit={handleUpload}>
                <input type="text" name="name" ref={nameRef} placeholder="Name" />
                <input type="file" name="img" ref={fileRef} multiple />
                <input type="text" name="url" ref={urlRef} placeholder="URL" />
                <button type="submit">Add</button>
            </form>
            {links.map(link => (
                <div className="link-box">
                    <div className="link-box__icon">
                        <img src={link.img} alt={link.name} />
                    </div>
                    <div className="link-box__name">
                        {link.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddLinkBox