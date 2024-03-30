const express = require("express");
const { client } = require('./client.js')
const { createTables, seedUsers, seedProducts, seedOrders } = require("./db/seed.js")
const { fetchUsers } = require("./db/users.js")
const { fetchProducts } = require("./db/products.js");
const { fetchOrders } = require("./db/orders.js");

const userRouter = require("./api/users");
const productRouter = require("./api/products");
const orderRouter = require("./api/orders");
const authRouter = require("./api/orders")


const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", authRouter);


const init = async () => {
    const port = process.env.PORT || 3000
    await client.connect()
    console.log('connected to database');

    await createTables();
    console.log('tables created');

    await seedUsers();
    // console.log("users", await fetchUsers());

    await seedProducts();
    // console.log("products", await fetchProducts())

    // await seedOrders();
    // console.log("products", await fetchOrders())
  
    app.listen(port, () => console.log(`\nlistening on port ${port}`))
  }
  
  init();