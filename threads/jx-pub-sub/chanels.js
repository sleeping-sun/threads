var server = require('jxm');

server.setApplication("Channels", "/channels", "NUBISA-STANDARD-KEY-CHANGE-THIS");
//server.linkResource("/", ["./index.html", "text/html"]);
server.setConfig("enableClientSideSubscription", true);
// when client will call "someMethod" with argument "true"
// server will subscribe him to a "testGroup"
server.addJSMethod("someMethod", function (env, param) {
    if (param) {
        server.subscribeClient(env, "testGroup");
    } else {
        server.unSubscribeClient(env, "testGroup");
    }
});

server.start();