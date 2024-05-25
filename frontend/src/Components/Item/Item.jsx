import React from "react";
import './Item.css';
import { Link } from "react-router-dom";

const Item = (props) => {
    const token = localStorage.getItem('auth-token');
    const userID = localStorage.getItem('user-id'); 

    const logProductView = async (productID, rating) => {
        if (userID) {
            try {
                const response = await fetch('http://localhost:4000/logview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID, productID, rating }),
                });

                if (!response.ok) {
                    console.error('Failed to log product view');
                }
            } catch (error) {
                console.error('Error logging product view:', error);
            }
        }
    };

    const handleImageClick = () => {
        logProductView(props.id, 1);
        window.scrollTo(0, 0);
    };

    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}>
                <img onClick={handleImageClick} src={props.image1} alt="" />
            </Link>
            <p>{props.name}</p>
            <div className="item-price">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                <div className="item-price-old">
                    ${props.old_price}
                </div>
            </div>
        </div>
    );
};

export default Item;
