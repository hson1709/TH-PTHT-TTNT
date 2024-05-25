import React from "react";
import './ProductFilter.css';
import productFilterData from '../Assets/all_product'; 
import Item from "../Item/Item";

const ProductFilter = ({ brand }) => {
    return (
        <div className="product-filter" id='product-filter'>
            <h2>Products by brand</h2>
            <div className="product-display-list">
                {productFilterData.map((item, index) => {
                    if (brand === "All" || brand === item.brand) {
                        return (
                            <Item
                                key={index}
                                id={item.id}
                                name={item.name}
                                image1={item.image1} 
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ProductFilter;
