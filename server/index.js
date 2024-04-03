const express = require("express");
const { client } = require('./client.js')
const { createTables, seedBooks, seedTable } = require("./db/seed.js")
const { fetchUsers } = require("./db/users.js")
const { fetchBooks } = require("./db/books.js");
const { fetchOrders } = require("./db/orders.js");

const cors = require('cors')

const userRouter = require("./api/users");
const bookRouter = require("./api/books");
const orderRouter = require("./api/orders");
const authRouter = require("./api/orders")


const app = express();
app.use(cors())
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

    // await seedTable();
    // console.log("orders", await fetchOrders())

    // await seedUsers();
    // console.log("users", await fetchUsers());

    // await seedBooks();
    // console.log("books", await fetchBooks());
  
    app.listen(port, () => console.log(`\nlistening on port ${port}`))
  }
  
  init();