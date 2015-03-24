const computecluster = require('compute-cluster');
var couchbase = require("couchbase");
// allocate a compute cluster 
var cc = new computecluster({
    module: './worker.js'
});

var toRun = 100;
var count = 0;
// then you can perform work in parallel 
var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    //console.log(n);
    return fib(n - 1) + fib(n - 2);
}

var time = process.hrtime();
var cluster = new couchbase.Cluster('127.0.0.1:8091');
var bucket = cluster.openBucket('test1', function (err) {

    for (var i = 0; i < toRun; i++) {
        var f = fib(30);
        bucket.insert('zdd' + i, {
            fib: f,
            num: 20
        }, function (err, res) {
            count++;
            if (count == toRun) {
                var diff = process.hrtime(time);
                console.log('Total: ', diff);
                cc.exit();
                process.exit();
            }
        });

    };
});