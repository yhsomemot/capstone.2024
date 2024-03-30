const express = require("express");
const { client } = require('./client.js')
const { createTables, seedUsers, seedBooks, seedOrders } = require("./db/seed.js")
const { fetchUsers } = require("./db/users.js")
const { fetchBooks } = require("./db/books.js");
const { fetchOrders } = require("./db/orders.js");

const userRouter = require("./api/users");
const bookRouter = require("./api/books");
const orderRouter = require("./api/orders");
const authRouter = require("./api/orders")


const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
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

    await seedBooks();
    // console.log("books", await fetchBooks())

    // await seedOrders();
    // console.log("books", await fetchOrders())
  
    app.listen(port, () => console.log(`\nlistening on port ${port}`))
  }
  
  init();