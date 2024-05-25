import React, { useState } from 'react';
import './NewsLetter.css'

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        setSubscribed(true);
        setEmail('');
    };

    return (
        <div className='newsletter'>
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input 
                    type="email" 
                    placeholder='Your Email id' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleSubscribe}>Subscribe</button>
            </div>
            {subscribed && <p>Thank you for your support!</p>}
        </div>
    )
}

export default NewsLetter;
