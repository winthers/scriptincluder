# grunt-scriptIncluder
> "inserts script references in to your files"

##Example

Include the **include** tag in your file where you want the scripts to be included.

```html
<head>
  <!-- [@include_scripts] -->
</head>
```

And they will be replaces with script refrences to all files defined in the config.

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

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

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
      options: {
        rootPath: "../",
      },
      dest: "public/index.txt",
      src: [
        "src/app.js",
        "src/apps/**/*.js"
      ]
  },
});
```

### Options

#### options.rootPath
Type: `String`
Default value: `',  '`

A string used to prepend to the included scripts src.

```js
  options.rootPath + filePath
```


### Usage Examples

#### Default Options


In this example, the scripts defined under each task (index_html/someotherfile_html) will be included in the tasks dest file.

```js
grunt.initConfig({
  scriptincluder: {
     index_html: {
        options: {
          rootPath: "../",
        },
        dest: "public/index.txt",
        src: [
          "src/app.js",
          "src/apps/**/*.js"
        ]
      },
      someotherfile_html: {
        dest: "public/foobar.html",
        src: {
          "src/foobar/**/*.js"
        }
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
          rootPath: "../",
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

#### Complete config

```js
grunt.initConfig({
  scriptincluder: {
      page1: {
        options: {
          rootPath: "../",
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
