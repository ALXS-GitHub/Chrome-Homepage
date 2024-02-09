import './LinkBox.css'
import React from 'react'

const LinkBox = (props) => {

    const { link } = props

    const handleClick = () => {
        window.location.href = link.url;
    }

    return (
        <div className="link-box link" onClick={handleClick}>
                <div className="link-box__icon">
                    <img src={link.img} alt={link.name} />
                </div>
            <div className="link-box__name">
                {link.name}
            </div>
        </div>
    )
}

export default LinkBox