const express = require("express");

const userRouter = require("./api/users");

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(3000);