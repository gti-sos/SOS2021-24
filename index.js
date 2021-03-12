var cool = require("cool-ascii-faces");
var exp = require("express");
var app = exp();

var port = 10000;

app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
})//cada vez que se hace un get por http 

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});