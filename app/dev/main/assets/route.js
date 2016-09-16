/**
*	route.js
*		- This runs on the Express side. This communicates
*		with the front end application.
*/

var express = require('express');
var app = express();

// npm install body-parser --save
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*** JSON Requests *********************************************************/

/* status codes. */
const STATUS_INPROGRESS = "In-Progress";
const STATUS_ACTIVE     = "Active";
const STATUS_COMPLETED  = "Completed";

/* sample database. */
var _database = [];

_database.push(
	{
			category:"cat",
			description:"desc",
			startDate:"start",
			completeDate:"complete",
			status:"status",
			aptID:"id",
			usr:"usr"
	});

// http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/alltickets', function(req,res) {

	res.send(_database);
});

app.post('/addticket', function(req,res) {

	_database.push(req.body);
	res.end('success');
});

app.listen(1234, function () {
	
  console.log('Listening on port 1234...');
});
