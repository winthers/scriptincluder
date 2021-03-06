/*
 * grunt-ScriptIncluder * https://github.com/mbw/ScriptIncluder *
 * Copyright (c) 2013 Martin b. winther
 * Licensed under the MIT license.
 */






'use strict';

module.exports = function(grunt) {

  var _ = require("underscore");

  grunt.registerMultiTask('scriptincluder', '"inserts script refrences in to your files"', function() {
    var fileContent = "";
    var filePath = this.data.dest;
    var options =  this.options({prependedPath: "", replacePath: ""});

    console.log("replacePath:", options.replacePath)

    var scriptIncludeBuilder = new ScriptTagBuilder(options.prependedPath, options.replacePath);
    var match_includeScript = /<!--(?:\s)?\[(?:\s)?@include_scripts(?:\s)?\](?:\s)?-->/gi;

    if (fileExist(filePath)) {
      fileContent = grunt.file.read(filePath);
      if (hasIncludeScriptTag(fileContent)) {
        var files = extractFilePaths(this.data.src);
        var scriptIncludes = scriptIncludeBuilder.create(files);
        var newFileContent = includeScripts(fileContent, scriptIncludes);
        grunt.file.write(filePath, newFileContent, "utf8");
      }
    }

    function extractFilePaths(data) {
      var files = _.flatten(data);
      var expandedFileGlobs = [];
      files.forEach(function(file) {
        var tempFiles = grunt.file.expand(file);
        if (tempFiles.length)
          expandedFileGlobs = expandedFileGlobs.concat(tempFiles);
      })
      return expandedFileGlobs;
    }

    function fileExist(file) {
      return grunt.file.exists(file);
    }

    function hasIncludeScriptTag(source) {
      return match_includeScript.test(source);
    }

    function includeScripts(source, scriptIncludes) {
      return source.replace(match_includeScript, scriptIncludes).toString();
    }
  })

  /** @internal class */
  function ScriptTagBuilder(prependedPath, replacePath) {

    this.create = function(files) {
      return createScriptIncludeHeader() +
        createScriptIncludeBody(files) +
        createScriptIncludeFotter();
    }

    var createFilePath = function (filePath) {
       var tmpReplacePath = replacePath + filePath.split("/").pop();
        return  (replacePath !== "") 
          ? tmpReplacePath  
          : prependedPath + filePath;
    }

    var createScriptIncludeHeader = function() {
      return "\t<!-- Generated Script includes -->\n";
    }

    var createScriptIncludeBody = function(files) {
      var scriptTags = "";

      console.log("creating includes")
      files.forEach(function(file) {

        var filePath = createFilePath(file);
        console.log("\t", filePath)

        scriptTags += "\t<script src='" + filePath + "'></script>\n";
      });

      return scriptTags;
    }


    var createScriptIncludeFotter = function() {
      return "\t<!-- /Generated Script includes -->\n";
    }
  }

};