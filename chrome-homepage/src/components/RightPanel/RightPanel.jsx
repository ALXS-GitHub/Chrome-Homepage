import './RightPanel.css'
import React from 'react'

const RightPanel = (props) => {

    const { content } = props

    return (
        <div className="right-panel">
            {content}
        </div>
    );
}

export default RightPanel;