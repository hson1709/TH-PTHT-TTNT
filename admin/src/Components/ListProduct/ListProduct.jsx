import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allproducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        if (sortBy === 'lowToHigh') {
          data.sort((a, b) => a.new_price - b.new_price);
        } else if (sortBy === 'highToLow') {
          data.sort((a, b) => b.new_price - a.new_price);
        }
        setAllProducts(data)
      });
  }

  useEffect(() => {
    fetchInfo();
  }, [sortBy])

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
    toast.success("Product removed successfully!")
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchText = e.target.value.toLowerCase();
    if (searchText) {
      const suggestedProducts = allproducts.filter(product =>
        product.name.toLowerCase().includes(searchText)
      );
      setSuggestions(suggestedProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setSuggestions([]);
  };

  const filteredProducts = allproducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='list-product'>
      <ToastContainer />
      <h1>All Products List</h1>
      <div className="search-container">
        <input type='text' placeholder='Search by product name...' value={searchTerm} onChange={handleSearch} className="search-bar" />
        {suggestions.length > 0 && (
          <ul className={`search-suggestions ${suggestions.length > 0 ? 'visible' : ''}`}>
            {suggestions.map((product, index) => (
              <li key={index} onClick={() => handleSuggestionClick(product.name)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <select onChange={handleSortChange} name='sortBy' className="sort-price-selector">
        <option value=''>Sort by</option>
        <option value='lowToHigh'>Price: Low to High</option>
        <option value='highToLow'>Price: High to Low</option>
      </select>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Brand</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {filteredProducts.map((product, index) => {
          return (
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image1} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.brand}</p>
              <p>{product.category}</p>
              <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ListProduct;
