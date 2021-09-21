const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./app/routes/auth');
const profileRoute = require('./app/routes/users');
const productRoute = require('./app/routes/product');
const cartRoute = require('./app/routes/cart');
const orderRoute = require('./app/routes/order');

dotenv.config();
const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB Connected'))
    .catch(((error) => console.log(error)));

app.use(express.json());
app.use("/api/v1/account", authRoute);
app.use("/api/v1/user", profileRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));