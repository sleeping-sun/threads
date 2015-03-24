#!/usr/bin/env node

var start = 0;
var counter = 0;
var amqp = require('amqplib');

amqp.connect('amqp://localhost').then(function (conn) {
    process.once('SIGINT', function () {
        conn.close();
    });
    return conn.createChannel().then(function (ch) {

        var ok = ch.assertQueue('hello', {
            durable: false
        });

        ok = ok.then(function (_qok) {
            return ch.consume('hello', function (msg) {
                //console.log(" [x] Received '%s'", msg.content.toString());
                if (start === 0) {
                    start = process.hrtime();
                }

                counter += 1;

                if (counter == 10000) {
                    var end = process.hrtime(start);
                    console.log(end);
                    process.exit(0);
                }
            }, {
                noAck: true
            });
        });

        return ok.then(function (_consumeOk) {
            console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
    });
}).then(null, console.warn);