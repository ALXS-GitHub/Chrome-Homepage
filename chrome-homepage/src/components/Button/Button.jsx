import './Button.css'
import React from 'react'

const Button = ({ children, onClick, size }) => {
    return (
        <div className={`button-${size}`} onClick={onClick}>
            {children}
        </div>
    )
}

Button.defaultProps = {
    children: null,
    onClick: () => { }, 
    size: 3
}

export default Button

