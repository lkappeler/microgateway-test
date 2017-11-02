module.exports = require('should');

var DataSource = require('loopback-datasource-juggler').DataSource;

global.getSchema = function() {
    var db = new DataSource(require('../'), {});
    // db.log = function (a) { console.log(a); };
    return db;
};
