var fs = require('fs'),
    execute = require('child_process').exec,
    inspect = require('util').inspect,
    ssh2 = require('ssh2');

new ssh2.Server({
    privateKey: fs.readFileSync('host.key')
}, function(client) {
    console.log('Client connected!');

    client.on('authentication', function(ctx) {
        if (ctx.method === 'password'
            && ctx.username === 'root'
            && ctx.password === 'cking123') {
            ctx.accept();
        }else {
            ctx.reject();
        }

    }).on('ready', function() {
        console.log('Client authenticated!');

        client.on('session', function(accept, reject) {
            var session = accept();
            session.once('exec', function(accept, reject, info) {
                console.log('Client wants to execute: ' + inspect(info.command));
                var stream = accept();
                //execute(info.command,{},function(err, stdout, serr){
                //    if(err) {
                //        console.log(info.command + ' is error');
                //    }else {
                //        console.log('stdout::',stdout);
                //        stream.write(stdout);
                //        stream.exit(0);
                //        stream.end();
                //    }
                //});
                stream.stderr.write('Oh no, the dreaded errors!\n');
                stream.write('Just kidding about the errors!\n');
                stream.exit(0);
                stream.end();
            });
        });
    }).on('end', function() {
        console.log('Client disconnected');
    });
}).listen(22, '127.0.0.1', function() {
    console.log('Listening on port ' + this.address().port);
});