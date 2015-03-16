const computecluster = require('compute-cluster');
var couchbase = require("couchbase");
// allocate a compute cluster 
var cc = new computecluster({
    module: './worker2.js'
});

var toRun = 100;

// then you can perform work in parallel 
var time = process.hrtime();
var cluster = new couchbase.Cluster('127.0.0.1:8091');
var bucket = cluster.openBucket('test1', function (err) {

    for (var i = 0; i < toRun; i++) {
        cc.enqueue({
            id: i,
            db_id: 'pzz_' + i
        }, function (err, r) {
            if (err) console.log("an error occured:", err);
            else {
                var result = JSON.parse(r);
                bucket.insert('a' + result.id, {
                    fib: result.fib,
                    num: result.rnd
                }, function (err, res) {});
            }
            if (--toRun === 0) {
                var diff = process.hrtime(time);
                console.log('Total: ', diff);
                cc.exit();
            }
        });
    };
});