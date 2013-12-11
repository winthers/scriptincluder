/*
 * grunt-ScriptIncluder * https://github.com/mbw/ScriptIncluder *
 * Copyright (c) 2013 Martin b. winther
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  	var _ = require("underscore");


  	
  	grunt.registerMultiTask('scriptincluder', '"inserts script refrences in to your files"', function() {


  		var options = this.options({rootPath: ""});
	   	var filePath = this.data.dest;
		var fileContent = "";
		var scriptBuilder = new ScriptTagBuilder(options.rootPath);
		
		// Matches: <!-- [@include_scripts] -->
		var regex_includeTag = /<!--(?:\s)?\[(?:\s)?@include_scripts(?:\s)?\](?:\s)?-->/gi;


  		function extractFilePaths(data) {
	    	var files = _.flatten(data);
	    	var expandedFileGlobs = [];
	    	files.forEach(function (file) {
				var tempFiles = grunt.file.expand(file);
				if(tempFiles.length)
					expandedFileGlobs = expandedFileGlobs.concat(tempFiles);
	      	})
	      	return expandedFileGlobs;
	    }

	    function fileExist(file) {
			return grunt.file.exists(file);    	
	    }

	    function hasIncludeScriptTag (source) {
	    	return regex_includeTag.test(source);
	    }

	    function includeScripts (source, scriptIncludes) {
	    	return source.replace(regex_includeTag, scriptIncludes).toString();
	    }


			if(fileExist(filePath)){
				fileContent = grunt.file.read(filePath);
				if(hasIncludeScriptTag(fileContent)){
					var files = extractFilePaths(this.data.src);
					var scriptIncludes = scriptBuilder.create(files);
					var newFileContent = includeScripts(fileContent, scriptIncludes);
					grunt.file.write(filePath, newFileContent, "utf8");
				}
			}
		

		

	

  	})

  	/** @internal class */
	function ScriptTagBuilder (rootPath) {

		/** @public */
		this.create = function (files) {
			return 	createScriptIncludeHeader() 	+ 
		   			createScriptIncludeBody(files) 	+
		   			createScriptIncludeFotter();
		}
		/* private 
		**************************************************/
		var createScriptIncludeHeader = function() {
			return "\t<!-- Generated Script includes -->\n";
		}
		var createScriptIncludeBody = function(files) {
	    	var scriptTags = "";
	    	console.log("creating includes")
	    	files.forEach(function(file){

	    		console.log("\t", rootPath + file)
	    		scriptTags += "\t<script src='" + rootPath + file + "'></script>\n";
	    	});
	    	return scriptTags;
		}
		var createScriptIncludeFotter = function() {
			return "\t<!-- /Generated Script includes -->\n";
		}
	}

};
