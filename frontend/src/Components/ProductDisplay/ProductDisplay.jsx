import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const token = localStorage.getItem('auth-token');
    const [userID, setUserID] = useState(null);
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [mainImage, setMainImage] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(1);

    const changeMainImage = (newImage, index) => {
        setMainImage(newImage);
        setSelectedImageIndex(index);
    };

    useEffect(() => {
        if (product) {
            setMainImage(product.image1);
            setSelectedImageIndex(1);
            const viewedProducts = JSON.parse(sessionStorage.getItem('viewedProducts')) || {};
            if (!viewedProducts[product.id]) {
                logProductView(product.id, 1); 
                viewedProducts[product.id] = true;
                sessionStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
            }
        }
    }, [product]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                if (token) {
                    const response = await fetch('http://localhost:4000/userid', {
                        method: 'GET',
                        headers: {
                            'auth-token': token,
                            'Content-Type': 'application/json',
                        },
                    });
                    const userData = await response.json();
                    if (userData.userId) {
                        setUserID(userData.userId);
                    }
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        fetchUserId();
    }, []);

    const logProductView = (productID, rating) => {
        if (userID) {
            fetch('http://localhost:4000/logview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, productID, rating }), 
            }).then((response) => {
                if (!response.ok) {
                    console.error('Failed to log product view');
                }
            });
        }
    };

    const handleAddToCart = async (productId) => {
        await addToCart(productId); 
        logProductView(productId, 2); 
    };

    if (!product) {
        return null;
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image1} alt="" onClick={() => changeMainImage(product.image1, 1)} className={selectedImageIndex === 1 ? 'selected' : ''} />
                    <img src={product.image2} alt="" onClick={() => changeMainImage(product.image2, 2)} className={selectedImageIndex === 2 ? 'selected' : ''} />
                    <img src={product.image3} alt="" onClick={() => changeMainImage(product.image3, 3)} className={selectedImageIndex === 3 ? 'selected' : ''} />
                    <img src={product.image4} alt="" onClick={() => changeMainImage(product.image4, 4)} className={selectedImageIndex === 4 ? 'selected' : ''} />
                </div>
                <div className="productdisplay-img">
                    {product.image1 && <img className='productdisplay-main-img' src={mainImage} alt="" />}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="product-des">Mô tả sản phẩm: </div>
                <div className="productdisplay-right-description">
                    <h1>{product.describe}</h1>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
            </div>
        </div>
    );
}

export default ProductDisplay;
