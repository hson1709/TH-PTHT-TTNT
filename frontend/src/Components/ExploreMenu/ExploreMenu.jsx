import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../Assets/assets'

const ExploreMenu = ({brand,setBrand}) => {
  return (
    <div className='explore-menu' id = 'explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'></p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setBrand(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={brand===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p> 
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu