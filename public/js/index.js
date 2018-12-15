// contains all the javascript funciton

var socket = io(); //this socket can also emit in chrome console

socket.on('connect', function(){
    console.log('Connetcted to server');

  /*   socket.emit('createMessage',{
        from: 'Andrew',
        text:'yo, Bro',
    }); */
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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

//third parameter, callback function, will be excuted if the message arrive
socket.emit('createMessage',{ 
    from:'frank',
    text:'Hi',
}, function (){
    console.log('Got it');
});

jQuery('#message-form').on('submit',function(e){ //# + id
    e.preventDefault(); // prevent the page to fresh
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name = message]').val(), //value
    }, function(){

    })
});