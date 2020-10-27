const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("app is working");
  });


app.listen(4000,()=>{
    console.log('server Up and running ')
})
