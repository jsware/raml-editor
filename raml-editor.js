#! /usr/bin/env node
var debug = require('debug')('raml-editor')
var express = require('express');
var fs = require('fs');
var path = require('path');
var program = require('commander');
//var ramlStore = require('./store/fileserver');
var spawn = require('child_process').spawn;

//
// Parse command line arguments...
//
program
  .version('1.0.0')
  .option('-p, --port <integer>', 'listen on the specified port', 3000)
  .arguments('<path>')
  .description('Opens the API Editor using the local filesystem <path> which can be a file or folder.')
  .action(function(location, cmdObj) {
    cmdObj.location=location;
    launch(location, cmdObj.port)
  })
  .parse(process.argv);

//
// Default to current working directory if no path provided.
//
if(program.location === undefined) {
  launch('.', program.port)
}

//
// Launch the API Editor...
//
function launch(location, port) {
  debug('launch(location="%s", port=%d)', location, port)

  var app = express();

  app.get('/', function(req, res) {
    var file = path.join(__dirname, 'html/raml-editor.html')
    debug('Serving HTML "%s"', file);
    fs.readFile(file, 'utf-8', function(err, content) {
      return res.send(content);
    });
  });

  app.use('/raml-store', fileserver(path.join(process.cwd(), location)));
  app.use('/api-designer', express.static(path.join(__dirname, 'node_modules/api-designer/dist')));
  app.use('/', express.static('/'));

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  // Listen on localhost only.
  app.listen(port, '127.0.0.1', () => spawn('open', [('http://localhost:' + port)]));
}

//
// Bind an express Router to the files API...
//
function fileserver(ramlPath){
  debug('fileserver(ramlPath="%s")', ramlPath)
  var router = express.Router();
  var bodyParser = require('body-parser');

  var api = require('./lib/filesapi')(ramlPath);

  router.use(bodyParser.json());
  router.get('/files/*', api.get);
  router.post('/files/*', api.post);
  router.put('/files/*', api.put);
  router.delete('/files/*', api.delete);

  return router;
}
