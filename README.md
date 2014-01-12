# grunt-scriptIncluder
> "inserts script references in to your files"

##Example

Include the **include** tag in your file where you want the scripts to be included.

```html
<head>
  <!-- [@include_scripts] -->
</head>
```

And they will be replaces with script references to all files defined in the config.

```html
<head>
  <!-- Generated Script includes -->
  <script src='...'></script>
  <script src='...'></script>
  <script src='...'></script>
  ...
  <!-- /Generated Script includes -->
</head>
```



## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plug-ins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-scriptincluder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-scriptincluder');
```

## The "scriptincluder" task

### Overview
In your project's Gruntfile, add a section named `scriptincluder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  scriptincluder: {
    task: {
      options: {
        prependedPath: "../",
      },
      dest: "public/index.html",
      src: [
        "src/app.js",
        "src/apps/**/*.js"
      ]
    }
  }
});
```

### Options

#### options.prependedPath
Type: `String`
Default value: `''`

A string used to perpend to the included scripts src.

```js
  options.prependedPath + filePath
```


#### options.replacePath

Type: `String`
Default value: `''`

Used to replace the path of the file.

```js
  options.replacePath + fileName
```



### Usage Examples

#### Default Options


In this example, the scripts defined under page1 will be included in the tasks dest file.

```js
grunt.initConfig({
  scriptincluder: {
     page1: {
        options: {
          prependedPath: "../",
        },
        dest: "public/page1.html",
        src: [
          "src/app.js",
          "src/apps/**/*.js"
        ]
      }
      
  },
});
```

#### Linked refrences
You can link to other files defined in the grunt config, this is helpful if you already have defined script files in a other tasks configuration, e.g. the concat task.


```js
grunt.initConfig({
  scriptincluder: {
   index: {
        options: {
          prependedPath: "../",
        },
        dest: "public/index.txt",
        src: [
          "<%= concat.someTarsk1.src %>",
          "<%= concat.someTarsk2.src %>",
          "<%= concat.someTarsk3.src %>"
        ]
      },
  }
});
```

#### Replaced path
You can link to other files defined in the grunt config, this is helpful if you already have defined script files in a other tasks configuration, e.g. the concat task.


```js
grunt.initConfig({
  scriptincluder: {
   index: {
        options: {
          replacePath: "foobar/",
        },
        dest: "public/index.txt",
        src: [
          "js/file1.js",
          "js/file2.js",
          "js/file3.js",
        ]
      },
  }
});
```

**output**

```html
  <script src='foobar/script1.js'></script>
  <script src='foobar/script2.js'></script>
  <script src='foobar/script3.js'></script>
  <script src='foobar/script4.js'></script>
```


#### Complete config


```js
grunt.initConfig({
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
      }
});
```

## Release History
 * 2013-12-11   v0.1.0   Initial release
 * 2013-12-11   v0.1.1   Readme fix
 * 2013-12-11   v0.1.2   Readme fix
 * 2014-12-01   v.1.0.0  Added replacePath, and renamed basePath to prependedPath.
