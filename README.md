# jenkins-pitesti

A wrapper around [pitesti](https://www.npmjs.com/package/pitesti) that ouputs XUnit results and LCov coverage data
into directories expected by Jenkins.

## Usage

Instead of

```js
var pitesti = require('pitesti');
```

do

```js
var pitesti = require('jemkins-pitesti');
```

Then to inovke your test file, instead of

```js
$ node test.js
```

do

```js
$ jenkins-pitest test.js
```

## Evnironment Variables

You can change the locations of the outputs by changing these environment
variables, which are the same as in [jenkins-mocha](https://www.npmjs.com/package/jenkins-mocha).

* `$(ARTIFACTS_DIR)` = `./artifacts`
* `$(TEST_DIR)` = `./$(ARTIFACTS_DIR)/test`
* `$(COVERAGE_DIR)` = `./$(ARTIFACTS_DIR)/coverage`

## License

See LICENSE.txt
