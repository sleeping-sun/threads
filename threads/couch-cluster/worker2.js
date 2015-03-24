var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    //console.log(n);
    return fib(n - 1) + fib(n - 2);
}

var rnd = 1;

process.on('message', function (m) {


    var f = fib(rnd);
    var result = {
        "fib": f,
        "rnd": rnd,
        "id": m.db_id
    };
    process.send(JSON.stringify(result));

});