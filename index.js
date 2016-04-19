#!/usr/bin/env node
/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/
var pitesti = require('pitesti');
var clone = require('readable-stream-clone');
var Transform = require('stream').Transform;
var tapXunit = require('tap-xunit');
var fs = require('fs');
var path = require('path');
var istanbulPath = require('npm-which')(__dirname).sync('istanbul');
var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');

function createXunitDest(file){
    var dest = tapXunit();
    var fileStream = fs.createWriteStream(file);
    dest.pipe(fileStream);
    return dest;
}

function artifactsDir () {
    var artifactsDir = process.env.ARTIFACTS_DIR || path.join(process.cwd(), 'artifacts');
    mkdirp.sync(artifactsDir);
    return artifactsDir;
}

function xunitFile () {
    var testDir = process.env.TEST_DIR || path.join(artifactsDir(), 'test');
    mkdirp.sync(testDir);
    return path.join(testDir, 'xunit.xml');
}

function coverageDir () {
    var coverageDir = process.env.COVERAGE_DIR || path.join(artifactsDir(), 'coverage');
    mkdirp.sync(coverageDir);
    return coverageDir;
}

module.exports = function(opts) {
    opts = opts || {};
    var source = new Transform({
        transform: function(chunk, enc, next) {
            this.push(chunk);
            next();
        }
    });
    var outputDest = opts.outputStream || process.stdout;
    var xunitDest = createXunitDest(xunitFile());;
    var source1 = new clone(source);
    var source2 = new clone(source);
    source1.pipe(outputDest);
    source2.pipe(xunitDest);
    opts.outputStream = source;
    var done = opts.done || process.exit;
    opts.done = function(code){
        xunitDest.end(()=>{
            setImmediate(()=>done(code));// TODO fix this timing shenanigans
        });
    };
    return pitesti(opts);
}

if (require.main === module) {
    var child = spawn('node', [
            istanbulPath,
            'cover',
            '--dir',
            coverageDir(),
            process.argv[2]
    ], {
        stdio: 'inherit',
        env: process.env
    });
}
