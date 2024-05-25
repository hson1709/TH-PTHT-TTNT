import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import { count_phone_Products, count_laptop_Products, count_watch_Products } from '../Components/Assets/all_product';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    const [sortBy, setSortBy] = useState(null);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        let sorted = [...all_product];
        if (sortBy === 'LowToHigh') {
            sorted.sort((a, b) => a.new_price - b.new_price);
        } else if (sortBy === 'HighToLow') {
            sorted.sort((a, b) => b.new_price - a.new_price);
        }
        setSortedProducts(sorted);
    }, [sortBy, all_product]);

    useEffect(() => {
        setVisibleCount(12);
    }, [props.category]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 12);
    };

    let count_Products;
    if (props.category === "Phone") {
        count_Products = count_phone_Products;
    } else if (props.category === "Laptop") {
        count_Products = count_laptop_Products;
    } else if (props.category === "Watch") {
        count_Products = count_watch_Products;
    } else {
        count_Products = 0;
    }

    const filteredProducts = sortedProducts.filter(item => item.category === props.category);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{Math.min(visibleCount, filteredProducts.length)}</span> out of {filteredProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    <select onChange={handleSortChange}>
                        <option value=''> Sort by: Price </option>
                        <option value='LowToHigh'> Price: Low to High</option>
                        <option value='HighToLow'> Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.slice(0, visibleCount).map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image1={item.image1} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
            {visibleCount < filteredProducts.length && (
                <div className="shopcategory-loadmore" onClick={handleLoadMore}>
                    Explore More
                </div>
            )}
        </div>
    );
}

export default ShopCategory;
