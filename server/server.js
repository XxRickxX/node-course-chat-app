'use strict'
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
var app = express();
const publicPath = path.join(__dirname, '../public'); // insert the relative path
const port = process.env.PORT||8888;
var server = http.createServer(app); //app is request listener
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined')
    /* from: 'Amin',
    text: 'New User joined',
    createdAt: new Date().getTime(), */
    );

    socket.on('createMessage', (message,callback)=>{ 
        console.log('createMessage',message);
        //socket.emit from Admin text welcome to the chat app
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback(); // call the funciton that created in client
        //socket.broadcast.emit from admin text New user joined

        //broadcast function, send to every body in this section
/*         socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime(),
        }); */
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });


});

console.log(__dirname + './../public'); //wrong
console.log(publicPath); // correct

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});

