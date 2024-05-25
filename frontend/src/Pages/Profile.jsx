import React, { useState, useEffect } from 'react';
import './CSS/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth-token');
      const res = await fetch('http://localhost:4000/userdetails', {
        headers: { 'auth-token': token }
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user details');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
