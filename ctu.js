var io = require('socket.io-client')('http://localhost:3000');

io.on('connect',function(){
    io.emit('airport','ctu');
});

io.on('data',function(data){
    console.log(data);
    io.emit('retData','操作完成');
})

io.on('disconnect',function(){
    console.log('ctu is disconnection');
})