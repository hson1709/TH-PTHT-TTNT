import React, { useState, useRef } from "react";
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from "../Components/NewCollections/NewCollections"
import NewsLetter from "../NewsLetter/NewsLetter";
import ExploreMenu from "../Components/ExploreMenu/ExploreMenu";
import ProductFilter from '../Components/ProductFilter/ProductFilter'


const Shop = () => {
    
    const [brand,setBrand] = useState("All");

    const exploreMenuRef = useRef(null);

    const newCollectionsRef = useRef(null);

    const handleScrollToExploreMenu = () => {
        exploreMenuRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };

    const handleScrollToNewCollections = () => {
        newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };

    return (
        <div>
            <Hero handleScrollToExploreMenu={handleScrollToExploreMenu} />
            <Popular/>
            <div ref={exploreMenuRef}> 
                <ExploreMenu brand={brand} setBrand={setBrand}/>
            </div>
            <ProductFilter brand={brand}/>
            <Offers handleScrollToNewCollections={handleScrollToNewCollections}/>
            <div ref={newCollectionsRef}>
                <NewCollections/>
            </div>
            <NewsLetter/>
        </div>
    )
}

export default Shop