import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css';
import { ShopContext } from '../../Context/ShopContext';

const token = localStorage.getItem('auth-token');

const PlaceOrder = () => {
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (token) {
                    const response = await fetch('http://localhost:4000/userid', {
                        method: 'GET',
                        headers: {
                            'auth-token': token,
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if (data.userId) {
                        setUserID(data.userId);
                    }
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, [])


    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const placeOrder = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            all_product.forEach((item) => {
                if (cartItems[item.id] > 0) {
                    let itemInfo = { ...item, quantity: cartItems[item.id] };
                    orderItems.push(itemInfo);
                }
            });
    
            let orderData = {
                userId: userID,
                address: data,
                items: orderItems,
                amount: getTotalCartAmount(),
            };
    
            let responseData = await fetch('http://localhost:4000/place', {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            }).then((response)=> response.json());
    
            if (responseData.success) {
                const {session_url} = responseData;
                window.location.replace(session_url);
            } else {
                alert("Error");
            }
        } catch (error) {
            console.log("Error occurred:", error);
            alert("An error occurred. Please try again later.");
        }
    }    

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const navigate = useNavigate()


  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
            <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
            <div className="multi-fields">
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
                <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
            </div>
            <div className="multi-fields">
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
            </div>
            <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className='cartitems-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
        </div>
    </form>
  )
}

export default PlaceOrder
