#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');
var msg = process.argv[2];

amqp.connect('amqp://localhost').then(function (conn) {
    return when(conn.createChannel().then(function (ch) {
        var queue = 'spammers';

        var ok = ch.assertExchange(queue, 'fanout', {
            durable: false
        });

        return ok.then(function (_qok) {
            ch.publish(queue, '', new Buffer(msg));
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
        });
    })).ensure(function () {
        conn.close();
    });;
}).then(null, console.warn);