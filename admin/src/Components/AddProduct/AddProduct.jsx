import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import delete_btn from '../../assets/delete_btn.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [images, setImages] = useState([null, null, null, null]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "Phone",
        new_price: "",
        old_price: "",
        describe: "",
        brand: "Apple"
    });

    const imageHandler = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setProductDetails({
            name: "",
            category: "Phone",
            new_price: "",
            old_price: "",
            describe: "",
            brand: "Apple"
        });
        setImages([null, null, null, null]);
    };

    const addProduct = async () => {
        const formData = new FormData();
        images.forEach((image, index) => {
            if (image) {
                formData.append(`image${index + 1}`, image);
            }
        });
        formData.append('name', productDetails.name);
        formData.append('describe', productDetails.describe);
        formData.append('brand', productDetails.brand);
        formData.append('category', productDetails.category);
        formData.append('new_price', productDetails.new_price);
        formData.append('old_price', productDetails.old_price);

        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData
            });
            const imageData = await response.json();

            if (imageData.success) {
                const productResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: productDetails.name,
                        describe: productDetails.describe,
                        brand: productDetails.brand,
                        category: productDetails.category,
                        new_price: productDetails.new_price,
                        old_price: productDetails.old_price,
                        ...imageData.image_urls 
                    })
                });
                const productData = await productResponse.json();

                if (productData.success) {
                    toast.success("Product added successfully!");
                    resetForm();
                } else {
                    toast.error("Failed to add product!");
                }
            } else {
                toast.error("Failed to upload images!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred, please try again later!");
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product description</p>
                <textarea value={productDetails.describe} onChange={changeHandler} name='describe' placeholder="Type here" />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-type">
                <div className="addproduct-itemfield">
                    <p>Brand</p>
                    <select value={productDetails.brand} onChange={changeHandler} name='brand' className='add-product-selector'>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Huawei">Huawei</option>
                        <option value="Xiaomi">Xiaomi</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Watch">Watch</option>
                    </select>
                </div>
            </div>
            {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="addproduct-upload-area">
                    <label htmlFor={`file-input-${index + 1}`}>
                        {images[index] ? (
                            <>
                                <img src={URL.createObjectURL(images[index])} className='addproduct-thumnail-img' alt="" />
                                <img onClick={() => removeImage(index)} src={delete_btn} className="delete-image" />
                            </>
                        ) : (
                            
                            <img src={upload_area} className='addproduct-thumnail-img' alt="" />
                        )}
                    </label>
                    <input onChange={(e) => imageHandler(e, index)} type="file" name={`image${index + 1}`} id={`file-input-${index + 1}`} hidden />
                </div>
            ))}
            <button onClick={addProduct} className="addproduct-btn">ADD</button>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;
