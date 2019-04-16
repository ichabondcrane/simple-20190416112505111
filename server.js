// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
app.all('/api/:folder/:file/:function', api);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);

/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port, () => console.log(`API running on localhost:${port}`));

function api(req, res) {
var strquery = require('./db2function');
let p = path.resolve();

  try {
     var fields, sql;
      sql =`SELECT ID, STATUS, DESCRIPTION FROM  CMW37659.REQ_DOCS` ;
      fields = ['ID,STATUS,DESCRIPTION'].join('').split(',');

    strquery.runquery(sql,fields, function(err, data, response) {
      if(!err){
        res.status(200).send(data);
      } else {
        return process.exit(err);
      }
    })


  } catch (err) {
    console.info('$app (api) =>', err);
    let msg = '$app.ts => (api) resource not found==>' + JSON.stringify(err);
    process.on('exit', function (err, res) {
      console.log('$app.ts (exit) => fatal error, system shutting down : ' + err);
      return process.exit(err);
    });
  }
}


  