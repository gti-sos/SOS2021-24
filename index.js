//Modules required
var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');


//Variables
var app = express();
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

//Server usages

app.use(bodyParser.json()); 
app.use(express.json());
app.use("/", express.static(path.join(__dirname,"public")));

//APIs
var schoolAPI = require("./schoolAPI");
schoolAPI.init(app);

var employmentAPI = require("./employmentAPI");
employmentAPI.init(app);

var hivAPI = require("./hivAPI");
hivAPI.init(app);



//========================F02 /cool====================
app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
})//cada vez que se hace un get por http 

//=======================F03 /info=====================


//=====================F04=========================

//=================================================
app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
