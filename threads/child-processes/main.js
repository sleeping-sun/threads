var cp = require('child_process');
var proccess_p00l = [];
var max = 10;
var count = 0;
var time = process.hrtime();

for (var i = 0; i < max; i++) {
    proccess_p00l[i] = cp.fork(__dirname + '/sub.js');

    proccess_p00l[i].on('message', function (m) {
        // console.log('PARENT got message:', m);
        count++;
        //console.log(count, '/', 100);
        if (count == max * 1000) {
            console.log(count++);
            var diff = process.hrtime(ss);
            console.log('end:', diff);
            process.exit(0);
        }
    });



}
var diff = process.hrtime(time);
console.log('workers spawned:', diff);
var ss = process.hrtime();
for (var i = 0; i < max; i++) {
    proccess_p00l[i].send(i + '___');
}