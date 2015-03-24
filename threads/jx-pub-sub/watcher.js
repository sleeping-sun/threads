var server = require('jxm');
var counter = 0;
var spammers_connected = 0;
var req_spammers = 20;
var message_count = process.argv[2];
var methods = {

    spammerIn: function (client, param) {
        spammers_connected++;
        console.log('spammer connected:', spammers_connected);
        if (spammers_connected == req_spammers) {
            console.log('Release spammers!');
            client.SendToGroup("testGroup", "startSpam", message_count);
        } else {
            console.log('Waiting ', req_spammers - spammers_connected, 'more spammers');
        }
    },
    count: function () {
        counter += 1;
        if ((counter / 100) == parseInt(counter / 100)) {
            console.log('got ', counter, '/', message_count, ' messages');
        }
        if (counter >= message_count) {
            client.SendToGroup("testGroup", "finished", message_count);

        }
    },
    finished: function () {
        process.exit(0);
    }
};

var client = server.createClient(methods, "channels",
    "NUBISA-STANDARD-KEY-CHANGE-THIS", "localhost", 8000);

client.on('connect', function (client) {
    console.log("Client connected");
    client.Subscribe("testGroup", function (group) {
        console.log("Subscribed to a " + group);
    });
    //client.Call("someMethod", true);
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