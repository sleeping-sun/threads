#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://localhost').then(function (conn) {
    return when(conn.createChannel().then(function (ch) {
        var q = 'hello';
        var msg = 'Hello World!';

        var ok = ch.assertQueue(q, {
            durable: false
        });

        return ok.then(function (_qok) {
            for (var i = 0; i < 10000; i += 1) {
                ch.sendToQueue(q, new Buffer(msg + i));
            }
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
        });
    })).ensure(function () {
        conn.close();
    });;
}).then(null, console.warn);