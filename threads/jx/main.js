var server = require('jxm');
var counter = 0;
server.setApplication("Hello World", "/helloworld", "NUBISA-STANDARD-KEY-CHANGE-THIS");
server.addJSMethod("serverMethod", function (env, params) {
    server.sendCallBack(env, params + " World!");
    counter++;
    console.log(counter,'|| recived external call of method "serverMethod"');

});
server.linkResource("/", ["./index.html", "text/html"]);
server.start({
    address: "127.0.0.1"
});