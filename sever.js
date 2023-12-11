require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");

const todoRoute = require("./routes/todoRoute");

//express app
const app = express();

// Use cors middleware
app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// route
app.use("/todo", todoRoute);

// connect db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(
        "listening to db & listening on port http://localhost:",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
