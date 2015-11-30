var io = require('socket.io')();

var sockets = {};
var client = {};

io.on('connection',function(socket){
    socket.on('airport',function(airport){
        sockets[airport] = socket;
    });
    socket.on('retData',function(data){
        client.socket.emit('retData',data);
    });
});

io.of('/client').on('connection',function(socket){
    client.socket = socket;
    socket.emit('welcome','welcome to cking system.');
    socket.on('operation',function(airport){
        client.target = airport;
        console.log('收到控制'+airport+'的请求');
        socket.emit('operation','操作允许');
    });
    socket.on('data',function(data){
        sockets[client.target].emit('data',data);
    });
})

io.listen(3000);