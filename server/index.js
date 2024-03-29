const express = require("express");

const userRouter = require("./api/users");
const productRouter = require("./api/products")

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(3000);