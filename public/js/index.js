// contains all the javascript funciton

var socket = io(); //this socket can also emit in chrome console

socket.on('connect', function(){
    console.log('Connetcted to server');

    socket.emit('createMessage',{
        from: 'Andrew',
        text:'yo, Bro',
    });
});
socket.on('disconnect',function(){
    console.log('Disconnected from server')
});



//----customer event-----
socket.on('newEmail',function(email){ //email is input argument from server
    console.log('new Email',email); //object
});

//
socket.on('newMessage',function(message){
    console.log('newMessage',message)
});
