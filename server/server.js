'use strict'
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname, '../public'); // insert the relative path
const port = process.env.PORT||8888;
var server = http.createServer(app); //app is request listener
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
});

console.log(__dirname + './../public'); //wrong
console.log(publicPath); // correct

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});

