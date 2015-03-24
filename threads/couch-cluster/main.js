const computecluster = require('compute-cluster');
var couchbase = require("couchbase");
// allocate a compute cluster 
var cc = new computecluster({
    module: './worker.js'
});

var toRun = 100;

// then you can perform work in parallel 
var time = process.hrtime();
for (var i = 0; i < toRun; i++) {
    cc.enqueue({
        id: i,
        db_id: '0_' + i
    }, function (err, r) {
        if (err) console.log("an error occured:", err);
        //    else console.log("Fib:", r);
        if (--toRun === 0) {
            var diff = process.hrtime(time);
            console.log('Total: ', diff);
            cc.exit();
        }
    });
};