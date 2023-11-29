import './Button.css'
import React from 'react'

const Button = ({ children, onClick }) => {
    return (
        <div className="button" onClick={onClick}>
            {children}
        </div>
    )
}

Button.defaultProps = {
    children: null,
    onClick: () => { }
}

export default Button

