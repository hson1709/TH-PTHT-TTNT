import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Pages/ProfileSideBar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import MyOrders from './Pages/MyOrders';
import Verify from './Pages/Verify';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import laptop_banner from './Components/Assets/Laptop_banner.png';
import phone_banner from './Components/Assets/banner1.png';
import watch_banner from './Components/Assets/Watch_banner.png';
import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <MainContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname === '/profile' || location.pathname === '/editprofile';

  return (
    <div className="main-content">
      {showSidebar && <Sidebar />}
      <div className={`content ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/phones' element={<ShopCategory banner={phone_banner} category="Phone" />} />
          <Route path='/laptops' element={<ShopCategory banner={laptop_banner} category="Laptop" />} />
          <Route path='/watches' element={<ShopCategory banner={watch_banner} category="Watch" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/delivery' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
