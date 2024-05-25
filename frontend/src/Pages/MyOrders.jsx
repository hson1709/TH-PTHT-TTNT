import React, { useState, useEffect } from 'react';
import './CSS/MyOrders.css';
import parcel_icon from '../Components/Assets/parcel_icon.png'

const MyOrders = () => {
  const token = localStorage.getItem('auth-token');
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(null);

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

  const fetchOrders = async () => {
    try {
      if (userID) {
        const responseData = await fetch('http://localhost:4000/userorders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userID }),
        }).then((response) => response.json());
        if (responseData.success) {
          setData(responseData.data);
        } else {
          alert('Error');
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token && userID) {
      fetchOrders();
    }
  }, [token, userID]);
  

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order,index)=>{
            return (
              <div className='my-orders-order'>
                  <img src={parcel_icon} alt="" />
                  <p>{order.items.map((item,index)=>{
                    if (index === order.items.length-1) {
                      return item.name+" x " +item.quantity
                    }
                    else {
                      return item.name+" x " +item.quantity+", "
                    }
                  })}</p>
                  <p>${order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                  <button onClick={fetchOrders}>Track Order</button>
              </div>
            )
        })}
      </div>
    </div>
  )
};

export default MyOrders;