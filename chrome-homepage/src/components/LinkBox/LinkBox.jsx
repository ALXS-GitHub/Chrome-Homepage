import './LinkBox.css'
import React from 'react'
import { useState, useEffect } from 'react'

const LinkBox = ({ name, url }) => {

    const pathExists = (name) => {
        const extensions = ['jpg', 'jpeg', 'png', 'gif']; // Add more extensions if needed

        for (let ext of extensions) {
            try {
                require(`../../images/linkbox/${name}.${ext}`);
                return ext;
            } catch (err) {
                continue; // If this extension doesn't work, try the next one
            }
        }
 
        return null; // If none of the extensions
    }

    const [extension, setExtension] = useState(pathExists(name)) // Default extension is jpg

    const handleClick = () => {
        window.location.href = url;
    }

    return (
        <div className="link-box" onClick={handleClick}>
            { extension ? (
                <div className="link-box__icon">
                    <img src={require(`../../images/linkbox/${name}.${extension}`)} alt={name} />
                </div>
            ) : null
            }
            <div className="link-box__name">
                {name}
            </div>
        </div>
    )
}

export default LinkBox