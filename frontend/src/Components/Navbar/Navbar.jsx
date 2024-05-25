import React, { useContext, useEffect, useRef, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import logo from '../Assets/shop_logo.svg';
import cart_icon from '../Assets/cart_icon.png';
import profile_icon from '../Assets/profile_icon.png';
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {

    const navigate = useNavigate();
    const [menu, setMenu] = useState(localStorage.getItem('selectedMenu') || 'shop');
    const { getTotalCartItems } = useContext(ShopContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        localStorage.setItem('selectedMenu', menu);
    }, [menu]);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const showLogin = () => {
        setShowDropdown(!showDropdown);
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    }

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo" onClick={handleClick}>
                <img src={logo} alt=""/>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className={`nav-menu ${showDropdown ? 'nav-menu-visible' : ''}`}>
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" && <hr/>}
                </li>
                <li onClick={() => { setMenu("phones") }}>
                    <Link style={{ textDecoration: 'none' }} to='/phones'>Phone</Link>
                    {menu === "phones" && <hr/>}
                </li>
                <li onClick={() => { setMenu("laptops") }}>
                    <Link style={{ textDecoration: 'none' }} to='/laptops'>Laptop</Link>
                    {menu === "laptops" && <hr/>}
                </li>
                <li onClick={() => { setMenu("watches") }}>
                    <Link style={{ textDecoration: 'none' }} to='/watches'>Watch</Link>
                    {menu === "watches" && <hr/>}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? (
                        <>
                            <button onClick={showLogin}><img src={profile_icon} alt="Profile" /></button>
                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    <li><button onClick={()=>navigate('/myorders')}>Orders</button></li>
                                    <li><button onClick={()=>navigate('/profile')}>Profile</button></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            )}
                        </>
                    )
                    : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;