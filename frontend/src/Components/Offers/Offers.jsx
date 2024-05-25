import React from "react";
import './Offers.css';
import saleBanner from '../Assets/Sale_banner.jpg';  

const Offers = ({ handleScrollToNewCollections }) => {

    const handleClick = () => {
        handleScrollToNewCollections();
    };

    return (
        <div className='offers'>
            <div className='offers-content'>
                <div className='offers-text'>
                    <h1>BRAND NEW PRODUCTS</h1>
                    <h1 className="sale-title">SALE</h1>
                    <p>UP TO 50% OFF</p>
                    <button onClick={handleClick}>CHECK NOW</button>
                </div>
                <div className='offers-image'>
                    <img src={saleBanner} alt="Sale Banner" />
                </div>
            </div>
        </div>
    );
}

export default Offers;
