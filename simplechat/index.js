var express = require("express");
var bunyan = require('bunyan');
//var process = require('process');
var app = express();
var port = 3700;
 
/*app.get("/", function(req, res){
    res.send("It works!");
});*/
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));
var log = bunyan.createLogger({name: process.env.COMPUTERNAME});
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
	    console.log(process.env.COMPUTERNAME);
		log.info({sender:'Sender Name', message: data},"Sender");
		log.warn({foo: 'bar'}, 'hi');
		log.error({foo: 'error'}, 'error');
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});