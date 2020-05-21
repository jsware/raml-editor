# RAML Editor using Local Filesystem

This repository contains an implementation of the [api-designer](https://github.com/mulesoft/api-designer) using the local filesystem. It is a fork of [sichvoge/api-designer-fs](https://github.com/sichvoge/api-designer-fs) with some refactoring and enhancements.

There are several areas changed to enable accessing the local filesystem and other improvements:

1. Provide an override for the default filesystem that is being used (browser cache) - find necessary code inside the `html` folder - originally by _sichvoge_.
2. Expose local filesystem as HTTP endpoint - find necessary code inside the `lib` folder - originally by _sichvoge_
3. Refactored code. Fixed bug not sending dot files like .gitignore. Added additional debug statements. Removed seemingly redundant additional listener and multiple attempt to start web server.
4. Added api-editor shell scripts that will automatically `npm install` if api-designer is missing.
5. Ability to web server port (which now defaults to a random port to allow multiple copies to run).
6. Made RAML folder optional and default to current directory so you can `cd my_api_folder && api-editor`.

## Installation

It is not hosted on NPM (yet). For now if you want to use it on your own, you can follow those simple steps:

1. Clone the repository
2. Execute `cd raml-editor`
3. Execute `npm install`
4. Execute `./raml-editor.js examples`

Alternatively you can put `raml-editor/bin` in your PATH so that api-editor works from where-ever you need.  If you don't specify a folder, the current directory is used.

## Usage

```
Usage: raml-editor [options] <location>

Opens the RAML Editor using the local filesystem <location> folder.

Options:
  -V, --version         output the version number
  -p, --port <integer>  listen on the specified port (default: 0)
  -h, --help            output usage information
```
