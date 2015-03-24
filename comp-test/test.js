var couchbase = require("couchbase");
var cluster = new couchbase.Cluster('127.0.0.1:8091');

console.log(cluster);