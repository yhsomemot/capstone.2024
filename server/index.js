const express = require("express");
const { client } = require('./client.js')
const { createTables, seedBooks, seedTable, seedUsers, seedGenre } = require("./db/seed.js")
const { fetchUsers } = require("./db/users.js")
const { fetchBooks } = require("./db/books.js");
const { fetchUserCart } = require("./db/cart_products.js");
const { fetchGenre } = require("./db/books.js");

const cors = require('cors');
const path = require('path');

const userRouter = require("./api/users");
const bookRouter = require("./api/books");
const cartRouter = require("./api/cart_products.js");
const checkoutRouter = require("./api/checkouts")

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/mycart", cartRouter);
app.use("/api/checkout", checkoutRouter);

const path = require('path');
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 



const init = async () => {
    const port = process.env.PORT || 3000
    await client.connect()
    console.log('connected to database');

    await createTables();
    console.log('tables created');

    // await seedGenre();
    // console.log("genre", await fetchGenre())

    await seedTable();
    console.log("carts", await fetchUserCart())
    // console.log("books", await fetchBooks())

    // await seedUsers();
    // console.log("users", await fetchUsers());

    // await seedBooks();
    // console.log("books", await fetchBooks());

  

   
  
    app.listen(port, () => console.log(`\nlistening on port ${port}`))
  }
  
  init();