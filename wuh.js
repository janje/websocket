var io = require('socket.io-client')('http://localhost:3000');

io.on('connect',function(){
    io.emit('airport','wuh');
});

io.on('data',function(data){
    console.log(data);
})


io.on('disconnect',function(){
    console.log('ctu is disconnection');
})