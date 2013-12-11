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




exports.scriptinicluder = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  it_should_include_files_in_to_htmlpage: function(test) {
    test.expect(1);


    var expected = grunt.file.read("./test/expected/page1.html").replace(/[\s\t\r\n]+/gi, "");
    var actual   = grunt.file.read("./tmp/page1.html").replace(/[\s\t\r\n]+/gi, "");

    test.equal(expected, actual, "")

    
    
    

    test.done();
  },

  it_should_include_files_for_multiple_targets: function (test) {
    test.expect(2);

    var expected1 = grunt.file.read("./test/expected/page1.html").replace(/[\s\t\r\n]+/gi, "");
    var actual1   = grunt.file.read("./tmp/page1.html").replace(/[\s\t\r\n]+/gi, "");

    var expected2 = grunt.file.read("./test/expected/page2.html").replace(/[\s\t\r\n]+/gi, "");
    var actual2   = grunt.file.read("./tmp/page2.html").replace(/[\s\t\r\n]+/gi, "");

    test.equal(expected1, actual1, "")
    test.equal(expected2, actual2, "")

    test.done();
  },

  it_should_correctly_include_files_on_config_reference: function (test) {
    test.expect(1);
    var expected = grunt.file.read("./test/expected/page3.html").replace(/[\s\t\r\n]+/gi, "");
    var actual   = grunt.file.read("./tmp/page3.html").replace(/[\s\t\r\n]+/gi, "");
    test.equal(expected, actual, "");
    test.done();
  }
  
};
