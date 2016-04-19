var test = require('../../index')();
var testerson = require('./testerson');

test('foo', testerson(function(r){r();}));
test('bar', testerson(function(_, r){r(Error());}));
test();
