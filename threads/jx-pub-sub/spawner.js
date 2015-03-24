const computecluster = require('compute-cluster');

// allocate a compute cluster 
var cc = new computecluster({
    module: './worker-spamer.js',
    max_processes: 20
});

var toRun = process.argv[2];
console.log(toRun);
// then you can perform work in parallel 
for (var i = 0; i < toRun; i++) {

    cc.enqueue({
        id: i
    }, function (err, r) {
        if (err) console.log("an error occured:", err);
        else console.log("time:", r);
        if (--toRun === 0) cc.exit();
    });
};