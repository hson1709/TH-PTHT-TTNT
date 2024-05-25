import React from 'react'
import './Orders.css'
import { useState,useEffect } from 'react'
import parcel_icon from '../../assets/parcel_icon.png'


const Oders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/allorders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.data); 
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  const statusHandler = async (e,orderId) => {
    let responseData = await fetch('http://localhost:4000/status', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status:e.target.value
        })
    })
    responseData = await responseData.json();
    if (responseData.success) {
        await fetchAllOrders()
    }
}

  useEffect(() => {
    fetchAllOrders();
  }, [])

  console.log(orders);

  return (
    <div className='order-add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className='order-item-product'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + " , "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Item : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Pending">Pending</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Oders;

