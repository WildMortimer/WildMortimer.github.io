const express = require('express')
var cookieParser = require('cookie-parser')
const path = require("path")
const fs = require('fs');

const app = express()
const port = 8080
const saltRounds = 10;

function logger(req, res, next) {
    console.log("\n \n" + req.method + " request at " + req.path + "\n Data: " + JSON.stringify(req.body) + "/n Cookies: " + JSON.stringify(req.cookies));
    next()
}

//app.use(cors(options));
//JSON-ify's the body   -- req.body
app.use(express.json())
//Parses cookies        -- req.cookies  
app.use(cookieParser())
app.use(logger)

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})