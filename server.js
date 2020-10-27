const express = require('express');
const app = express();
require("dotenv/config");
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("app is working");
  });

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('server Up and running ')
})
