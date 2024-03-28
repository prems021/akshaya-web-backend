var express = require("express");
var private_router = express.Router();



private_router.get("/", function (req, res, next) {
    res.json({ data: "private api waked" });
  });
  



 


module.exports = private_router;