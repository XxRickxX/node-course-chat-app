const path = require('path');
const express = require('express');

var app = express();
const publicPath = path.join(__dirname, '../public'); // insert the relative path
const port = process.env.PORT||3000;

app.use(express.static(publicPath));

console.log(__dirname + './../public'); //wrong
console.log(publicPath); // correct

app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});

