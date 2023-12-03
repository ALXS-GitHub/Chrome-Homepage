import './Home.css'
import React from 'react'



import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'


const Home = () => {

    return (
        <div className="home">
            <LeftPanel />
            <RightPanel />  
        </div>
    )
}

export default Home