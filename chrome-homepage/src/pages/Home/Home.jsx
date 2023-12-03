import './Home.css'
import React from 'react'



import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from '../../components/RightPanel/RightPanel'
import HomeRightPanel from './HomeRightPanel/HomeRightPanel'


const Home = () => {

    return (
        <div className="home">
            <LeftPanel />
            <RightPanel content={<HomeRightPanel />} /> 
        </div>
    )
}

export default Home