const express = require("express");
const { client } = require('./client.js')

const userRouter = require("./api/users");
const productRouter = require("./api/products")

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const init = async () => {
    const port = process.env.PORT || 3000
    await client.connect()
  
    app.listen(port, () => console.log(`\nlistening on port ${port}`))
  }
  
  init()