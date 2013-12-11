'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


function readFileAndNormalizeContent (filePath) {
  return grunt.file.read(filePath).replace(/[\s\t\r\n]+/gi, "");
}

exports.scriptinicluder = {
  
  setUp: function(done) {
    done();
  },

  it_should_include_files_in_to_htmlpage: function(test) {
    var actual   = readFileAndNormalizeContent("./tmp/page1.html");
    var expected = readFileAndNormalizeContent("./test/expected/page1.html");
    
    test.expect(1);
    test.equal(expected, actual, "")
    test.done();
  },

  it_should_include_files_for_multiple_targets: function (test) {
    var actual1   = readFileAndNormalizeContent("./tmp/page1.html");
    var actual2   = readFileAndNormalizeContent("./tmp/page2.html");
    var expected1 = readFileAndNormalizeContent("./test/expected/page1.html");
    var expected2 = readFileAndNormalizeContent("./test/expected/page2.html");

    test.expect(2);
    test.equal(expected1, actual1, "")
    test.equal(expected2, actual2, "")
    test.done();
  },

  it_should_correctly_include_files_on_config_reference: function (test) {
    var actual   = readFileAndNormalizeContent("./tmp/page3.html");
    var expected = readFileAndNormalizeContent("./test/expected/page3.html");
    
    test.expect(1);
    test.equal(expected, actual, "");
    test.done();
  }
  
};
