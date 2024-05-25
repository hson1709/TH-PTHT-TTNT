import React from "react";
import './Hero.css'

const Hero = ({ handleScrollToExploreMenu }) => {
    
    const handleClick = () => {
        handleScrollToExploreMenu();
    };
    
    return (
        <div className='hero'>
            <div className="hero-contents">
                <h2>NEW ARRIVALS ONLY</h2>
                <p>Menu just for you
               </p>
                <button onClick={handleClick}>View Menu</button>
            </div>    
        </div>
    )
}

export default Hero;