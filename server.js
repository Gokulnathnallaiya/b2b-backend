const express = require('express');
const app = express();
require("dotenv/config");
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require("mongoose");

//routes

const productRoutes = require("./routes/Products");
const sellerRoutes = require("./routes/Sellers");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/products",productRoutes);
app.use("/sellers",sellerRoutes);


app.get("/", (req, res) => {
    res.send("app is working");
  });

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.mongo_connection,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected");
  }
);

app.listen(port,()=>{
    console.log('server Up and running ')
})
