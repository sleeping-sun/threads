var server = require('jxm');
var start = 0;
var methods = {


    finished: function (client, param) {

        var end = process.hrtime(start);
        console.log(end);
    }
};

var client = server.createClient(methods, "channels",
    "NUBISA-STANDARD-KEY-CHANGE-THIS", "localhost", 8000);

client.on('connect', function (client) {
    console.log("Client connected");
    client.Subscribe("testGroup", function (group) {
        console.log(group);
        client.SendToGroup(group, "listen", "im emiter");
        start = process.hrtime();
        for (var i = 0; i < 1001; i += 1) {
            client.SendToGroup(group, "count", "wololo");
        }
        var e = process.hrtime(start);
        console.log(e);
    });

});

/*
client.on('subscription', function (client, subscribed, group) {
    console.log(subscribed ? "Subscribed to" : "Unsubscribed from", "the group", group);
    if (subscribed) {
        client.SendToGroup(group, "clientsMethod", "Hello from JXcore client");
    }
});
*/

client.on('close', function (client) {
    console.log("Client disconnected");
});

client.on('error', function (client, err) {
    console.log("Error:", err);
});

client.Connect();