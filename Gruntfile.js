/*
 * grunt-ScriptIncluder * https://github.com/mbw/ScriptIncluder *
 * Copyright (c) 2013 Martin b. winther
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      options: {
        force: true
      },
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    scriptincluder: {
      
      page1: {
        options: {
          prependedPath: "../",
        },
        dest: "tmp/page1.html",
        src: [
          "tmp/scripts/page1/*.js"
        ]
      },

      page2: {
        dest: "tmp/page2.html",
        src: [
          "tmp/scripts/page2/*.js"
        ]
      },

      page3: {
        dest: "tmp/page3.html",
        src: [
          "<%= scriptincluder.page1.src %>",
          "<%= scriptincluder.page2.src %>"
        ]
      },


      page4: {
        options: {
          prependedPath: "",
          replacePath: "foobar/"
        },
        dest: "tmp/page4.html",
        src: [
          "<%= scriptincluder.page1.src %>",
          "<%= scriptincluder.page2.src %>"
        ]

      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

// Copies files to use for the test.
  grunt.registerTask('prepareTest', 'Will create the files needed for the test.', function() {

    function readFromAndSaveToFile(fromPath, toPath) {
      if(grunt.file.exists(fromPath))
        grunt.file.write(toPath, grunt.file.read(fromPath))
    }

    var files = [
      {from:"./test/fixtures/page1.html",       to:"./tmp/page1.html"},
      {from:"./test/fixtures/page2.html",       to:"./tmp/page2.html"},
      {from:"./test/fixtures/page3.html",       to:"./tmp/page3.html"},
      {from:"./test/fixtures/page4.html",       to:"./tmp/page4.html"},
      {from:"./test/fixtures/page1/script1.js", to: "./tmp/scripts/page1/script1.js"},
      {from:"./test/fixtures/page1/script2.js", to: "./tmp/scripts/page1/script2.js"},
      {from:"./test/fixtures/page2/script3.js", to: "./tmp/scripts/page2/script3.js"},
      {from:"./test/fixtures/page2/script4.js", to: "./tmp/scripts/page2/script4.js"}
    ]

    files.forEach(function(data){
      readFromAndSaveToFile(data.from, data.to);  
    })
  });



  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');





  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', "prepareTest", 'scriptincluder', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
