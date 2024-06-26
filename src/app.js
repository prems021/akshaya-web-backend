
const express = require("express");
const fileUpload = require('express-fileupload');
const privateroutes = require("./routes/private");
const public_router = require("./routes/public");
const apiMiddleware = require("./middlewares/auth");

var cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 9002;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/akshaya-web-backend/api/",apiMiddleware, privateroutes);

app.use("/akshaya-web-backend/public/",public_router);

app.get("akshaya-web-backend/about", function(req, res) {
    res.send("Hello World, How are you!");  
});


app.get("/akshaya-web-backend/", function(req, res) {  
   res.send("Hello World, How are you!");
});

// app.options('*', cors())

app.listen(port, function() {
  console.log(`This app tuning on port ${port}!`);
});


