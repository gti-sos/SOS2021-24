var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();

var port = process.env.PORT || 10000;

app.use("/", express.static(path.join(__dirname,"public")));

app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
})//cada vez que se hace un get por http 

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});