var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    //console.log(n);
    return fib(n - 1) + fib(n - 2);
}
process.on('message', function (m) {
    console.time('worker');
    var rnd = parseInt(Math.random() * 40)
    var f = fib(rnd);
    console.timeEnd('worker');
    process.send(m.id + ':' + rnd + ':' + f);
});