const computecluster = require('compute-cluster');

// allocate a compute cluster 
var cc = new computecluster({
    module: './worker.js'
});

var toRun = 10

// then you can perform work in parallel 
for (var i = 0; i < toRun; i++) {
    cc.enqueue({
        id: i
    }, function (err, r) {
        if (err) console.log("an error occured:", err);
        else console.log("Fib:", r);
        if (--toRun === 0) cc.exit();
    });
};