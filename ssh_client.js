var Client = require('ssh2').Client;

var conn = new Client();
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.exec('cd', function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', function(data) {
            console.log('result: ' + data);
        }).stderr.on('data', function(data) {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '127.0.0.1',
    port: 22,
    username: 'root',
    password: 'cking123'
});