import React from 'react'
import  './CSS/ProfileSideBar.css'
import {Link} from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to ={'/profile'} style={{textDecoration:"None"}}>
        <div className="sidebar-item">
            <p>Information</p>
        </div>
      </Link>
      <Link to ={'/editprofile'} style={{textDecoration:"None"}}>
        <div className="sidebar-item">
            <p>Edit</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar


