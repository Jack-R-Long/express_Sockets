// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Get sockets 
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function(socket) {
	socket.emit('greeting', { msg: 'Greetings, from server Node' });
	socket.on('thankyou', function(data) {
		console.log(data.msg)
	});
	socket.on('posting_form', function(data) {
		console.log("Data recieved")
		data_obj = data.data_obj
		number = Math.floor(Math.random()*100)
		socket.emit('show_form', data_obj, number)

	});

});
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(request, response){
	response.send("404")
});

// tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// });