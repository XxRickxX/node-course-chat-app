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

/*     socket.emit('newMessage',{
        from:'John',
        text:'See you then',
        timestamp: new Date().getDate(),
    }); */

    socket.on('createMessage', (message)=>{
        console.log('createMessage',message);
        //socket.emit from Admin text welcome to the chat app
        io.emit('newMessage',{
            from: 'Amin',
            text: 'Welcome to the chat app',
        });

        //socket.broadcast.emit from admin text New user joined

        socket.broadcast.emit('newMessage',{
            from: 'Amin',
            text: 'New User joined',
            createdAt: new Date().getTime(),
        });

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

