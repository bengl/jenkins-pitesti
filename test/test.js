var exec = require('child_process').exec;
var path = require('path');
var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var jenkinsPitesti = path.resolve(__dirname, '..', 'index.js');
process.chdir(path.join(__dirname, 'test-app'));

rimraf.sync(path.join(__dirname, 'test-app', 'artifacts'));
exec('node ' + jenkinsPitesti + ' test.js', function(err, stdout, stderr) {
    var coverageStat = fs.statSync(path.join(__dirname, 'test-app', 'artifacts', 'coverage', 'coverage.json'));
    assert(coverageStat.size > 0);
    var xunitStat = fs.statSync(path.join(__dirname, 'test-app', 'artifacts', 'test', 'xunit.xml'));
    assert(xunitStat.size > 0);
    console.log('passed');
});
