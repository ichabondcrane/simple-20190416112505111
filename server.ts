// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
//const api = require('./server/routes/api');

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
const port =  '3000';
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


let p = path.resolve();


try {
// var f = require(p + `/server/routes/app/${req.params.folder}/${req.params.file}`)[req.params.function];
// console.info((`/server/routes/${req.params.folder}/${req.params.file}`)[req.params.function]);
// grants f = require(p + `/server/routes/app/${req.params.folder}/${req.params.file}`)[req.params.function];

console.log('value of p' + p);
console.log('value of params function' + [req.params.function]);
console.log('value of params file' + [req.params.file]);
console.log('value of params folder' + [req.params.folder]);

// console.log(p + `/src/app/${req.params.folder}/${req.params.file});
// var f = require(p + `/src/app/${req.params.folder}/${req.params.file}`)[req.params.function];
var f = require(p + `/src/app/${req.params.folder}/${req.params.file}/selectdata`);

} catch (err) {
console.info('$app (api) =>', err);

let msg = '$app.ts => (api) resource not found==>' + JSON.stringify(err);
// require('./routes/app/slack/slack').msg(msg);
process.on('exit', function (err, res) {
console.log('$app.ts (exit) => fatal error, system shutting down : ' + err);
// require('./routes/app/slack/error-int').msg(msg);
return process.exit(err);
});
}
}