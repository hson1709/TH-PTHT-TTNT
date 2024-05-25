import React from 'react'
import  './Sidebar.css'
import {Link} from 'react-router-dom'
import add_prodcut_icon from '../../assets/add_product_icon.svg'
import list_product_icon from '../../assets/list_product_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to ={'/addproduct'} style={{textDecoration:"None"}}>
        <div className="sidebar-item">
            <img src={add_prodcut_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to ={'/listproduct'} style={{textDecoration:"None"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
      <Link to ={'/orders'} style={{textDecoration:"None"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Orders List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar


