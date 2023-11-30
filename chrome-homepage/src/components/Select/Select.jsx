import './Select.css'
import React from 'react'
import { useState, useEffect } from 'react'

/**
 * 
 * @onChange function to call when an option is selected, must take a value as a parameter (the value of the selected option)
 * @returns 
 */
const Select = ({ options, onChange, value, size }) => {
    
    const [open, setOpen] = useState(false)

    const handleSelectClick = () => {
        setOpen(!open)
    }

    const handleOptionClick = (value) => {
        onChange(value)
        setOpen(false)
    }

    // Close select when clicking outside of it
    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (!e.target.closest(".select")) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [value])

    return (
        <div className="select" id={value}>
            <div className="select__selected" onClick={handleSelectClick}>
                {value}
            </div>
            {open ? (
                <div className="select__options">
                    {options.map((option, index) => (
                        <div className="select__option" key={index} value={option.value} onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

Select.defaultProps = {
    options: [],
    onChange: () => { },
    value: '',
    size: 2
}

export default Select