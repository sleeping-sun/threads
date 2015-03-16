var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    //console.log(n);
    return fib(n - 1) + fib(n - 2);
}
var rnd = 1;

process.on('message', function (m) {
    var couchbase = require("couchbase");

    var cluster = new couchbase.Cluster('127.0.0.1:8091');
    var f = fib(rnd);
    // var time = process.hrtime();
    var bucket = cluster.openBucket('test1', function (err) {

        bucket.insert('kzz' + m.db_id, {
            fib: f,
            num: rnd
        }, function (err, res) {
            //       var diff = process.hrtime(time);
            process.send(m.id + ':' + rnd);
        });

    });

});