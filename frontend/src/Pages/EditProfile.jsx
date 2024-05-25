import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/EditProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');

    const res = await fetch('http://localhost:4000/updateuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify(user)
    });

    if (res.ok) {
      toast.success('Profile updated successfully!', {});
      setTimeout(() => {
        window.location.href = '/profile';
      }, 2000);
    } else {
      toast.error('Failed to update profile', {});
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
