const express = require('express');
const app = express();
require("dotenv/config");
require('./db/mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const bcrypt = require("bcryptjs");


//routes

const productRoutes = require("./routes/product");
const sellerRoutes = require("./routes/seller");




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/products",productRoutes);
app.use("/sellers",sellerRoutes);



app.get("/", (req, res) => {
    res.send("app is working");
  });

const port = process.env.PORT || 3000;




const myFUnction = async ()=>{

  const password = "Red12345"
  const hashedpassword = await bcrypt.hash(password, 8 )
 

  const isMatch = await bcrypt.compare("Red12345",hashedpassword)
  

}
myFUnction();

app.listen(port,()=>{
    console.log('server Up and running ')
})
