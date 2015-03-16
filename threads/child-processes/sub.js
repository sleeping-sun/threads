var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    //console.log(n);
    return fib(n - 1) + fib(n - 2);
}

var max = 10000;

process.on('message', function (m) {
    for (var i = 0; i < max; i += 1) {
        process.send({
            id: i + m,
            message: 'Message' + i,
            some_other: {
                text: 'adsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkl' + i,
                text2: 'adsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadasadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkl' + i,
                text3: 'adsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadasdsdadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkl' + i,
                text4: 'adsdsadddadadadadadgdddsdashjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkladsdsadddadadadadadghjkl' + i
            }
        });
    }
});