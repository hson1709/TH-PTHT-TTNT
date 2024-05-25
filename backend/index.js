const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error, log } = require("console");
const fs = require('fs');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://hson1709:hson1709@cluster0.pbmbvgz.mongodb.net/e-commerce")

// API Creation

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storgage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), (req, res) => {
    res.json({
        success: 1,
        image_urls: {
            image1: `http://localhost:${port}/images/${req.files['image1'][0].filename}`,
            image2: `http://localhost:${port}/images/${req.files['image2'][0].filename}`,
            image3: `http://localhost:${port}/images/${req.files['image3'][0].filename}`,
            image4: `http://localhost:${port}/images/${req.files['image4'][0].filename}`
        }
    })
})

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    image3: {
        type: String,
        required: true,
    },
    image4: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// Creating API for adding products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        describe: req.body.describe,
        brand: req.body.brand,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for deleting Producst

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema creating for User model

const Users = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});


// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

// Creating endpoint for use login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password == user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email" });
    }
})

// creating middelware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})

// creating endpoint for removing products in cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcard', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);
})

// creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);
})

// Creating endpoint to get user ID
app.get('/userid', fetchUser, async (req, res) => {
    try {
        res.json({ userId: req.user.id });
    } catch (error) {
        res.status(500).json({ errors: "Server Error" });
    }
});


// Schema for Order 
const Order = mongoose.model("Order", {
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    payment: {
        type: Boolean,
        default: false,
    },
})

const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51PFeqW2Lq0QDAWCZh3peKXXddhOibe0LOLHIGkeyURm0bURfVmPAZrkDBy4wlXl7WEHPWiLohUM78X9PAZACPDHD000quAgzxb')
const frontend_url = "http://localhost:3000"

// Creating API for ordering products
app.post('/place', async (req, res) => {


    const getDefaultCart = () => {
        let cart = {};
        for (let index = 0; index < 300 + 1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await Users.findOneAndUpdate({ _id: req.body.userId }, { cartData: getDefaultCart() });


        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.new_price * 100
            },
            quantity: item.quantity
        }))


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
})

// Creating endpoit for verify
app.post('/verify', async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
})

// user orders for frontend
app.post('/userorders', async (req,res) => {
    try {
        const orders = await Order.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
})

// Listing orders for admin panel
app.get('/allorders', async (req,res) => {
    try {
        const orders = await Order.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
})

// api for updating order status
app.post('/status', async (req,res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
})

// Creating endpoint to get user details
app.get('/userdetails', fetchUser, async (req, res) => {
    try {
        let user = await Users.findOne({ _id: req.user.id });
        res.json(user);
    } catch (error) {
        res.status(500).json({ errors: "Server Error" });
    }
});

// Creating endpoint to update user details
app.post('/updateuser', fetchUser, async (req, res) => {
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id: req.user.id },
            {
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                phone: req.body.phone,
            },
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ errors: "Server Error" });
    }
});

app.post('/logview', (req, res) => {
    const { userID, productID, rating } = req.body;

    console.log("Received Data: ", req.body); 

    const logEntry = `${userID},${productID},${rating}\n`;

    console.log("Log Entry: ", logEntry);

    fs.appendFile('user_view.csv', logEntry, (err) => {
        if (err) {
            console.error("Failed to log product view", err);
            return res.status(500).json({ success: false, message: "Failed to log product view" });
        }
        console.log("Successfully logged product view");
        res.json({ success: true, message: "Product view logged" });
    });
});


app.listen(port, (erorr) => {
    if (!erorr) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error: " + erorr)
    }
})