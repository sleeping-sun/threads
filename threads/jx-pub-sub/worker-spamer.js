 var server = require('jxm');
 var start = 0;

 process.on('message', function (m) {
     var methods = {
         finished: function (client, param) {

             var end = process.hrtime(start);
             //console.log(param, ' messages at ', end, 'seconds');
             process.send(end);
             client.Close();
         },
         startSpam: function (c, param) {
             console.log('starting spam');
             start = process.hrtime();
             for (var i = 0; i < param; i += 1) {
                 client.SendToGroup("testGroup", "count", "wololo");
             }
         }
     };


     var client = server.createClient(methods, "channels",
         "NUBISA-STANDARD-KEY-CHANGE-THIS", "localhost", 8000);

     client.on('connect', function (client) {
         console.log("Client connected", m);
         client.Subscribe("testGroup", function (group) {
             client.SendToGroup(group, "spammerIn", "im spammer");
         });

     });


     client.on('close', function (client) {
         console.log("Client disconnected");
     });

     client.on('error', function (client, err) {
         console.log("Error:", err);
     });

     client.Connect();
 });