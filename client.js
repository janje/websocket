var io = require('socket.io-client')('http://localhost:3000/client');

io.on('connect',function(){

});

io.on('welcome',function(data){
    console.log(data);
    operation('ctu');
});

function operation(airport){
    console.log('我要操作'+airport+'服务器');
    io.emit('operation','ctu');
}

io.on('operation',function(data){
    console.log(data);
    io.emit('data','把航班显示系统更新了');
})

io.on('retData',function(data){
    console.log(data);
})


io.on('disconnect',function(){
    console.log('client is disconnection');
})