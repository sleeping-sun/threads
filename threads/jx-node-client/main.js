var server = require('jxm');

var client = server.createClient(null, "helloworld",
    "NUBISA-STANDARD-KEY-CHANGE-THIS", "localhost", 8000);

client.on('connect', function (client) {
    console.log("Client connected");
    var counter = 0;
    var max = 1000;
    var start = process.hrtime();
    var int_run = 0;
    var int = setInterval(function () {
        int_run++;
        console.log('int:', int_run);
        if (int_run >= 20) {
            clearInterval(int);
        }
        for (var i = 0; i < max / 20; i += 1) {
            //console.log('fire ', i);
            //delay(10);
            client.Call("serverMethod", "Hello", function (param, err) {
                if (err) {
                    console.log("Error while calling server's method. Code: ", err);
                } else {
                    //  console.log("Received callback from the server:", param);
                    counter += 1;
                    if (counter == max) {
                        var end = process.hrtime(start);
                        console.log('Time spent:', end);
                        process.exit(0);
                    }
                }

            });
        }
    }, 100);
});

client.on('close', function (client) {
    console.log("Client disconnected");
});

client.on('error', function (client, err) {
    console.log("Error:", err);
});

client.Connect();