//Modules required
var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var Datastore = require("nedb");
var cors = require("cors");
var request = require("request");

//Variables
var app = express();
var port = (process.env.PORT || 10000);

//Server usages
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname,"public")));

//APIs
var schoolAPI = require("./src/back/schoolAPI/v2");
schoolAPI.init(app);

var employmentAPI = require("./src/back/employmentAPI/v2");
employmentAPI.init(app);

var hivAPI = require("./src/back/hivAPI/v2");
hivAPI.init(app);

//INTEGRACIONES

//================Proxys de Enrique================

/*
//Grupo 10: obesity-stats
var pathObesityStats = "/api/integration/obesity-stats"
var apiObesityStats = "http://sos2021-10.herokuapp.com"

app.use(pathObesityStats, function(req, res){
	var url = apiObesityStats + req.baseUrl + req.url;
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(url).pipe(res));
});

//Grupo 10: foodconsumption-stats
var pathFoodStats = "/api/integration/foodconsumption-stats"
var apiFoodStats = "http://sos2021-10.herokuapp.com"

app.use(pathFoodStats, function(req, res){
	var url = apiFoodStats + req.baseUrl + req.url;
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(url).pipe(res));
});
*/

//Grupo 4: education expenditures
var remoteAPI_2 = "http://education-expenditures.herokuapp.com/api/v1"
var pathEducation = "/api/v1"
app.use(pathEducation, function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(remoteAPI_2)).pipe(res);
});

var remoteAPI1 = "http://api.quotable.io/random"
var pathQuote = "/random"
app.use(pathQuote, function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(remoteAPI1)).pipe(res);
});



//========================F02 /cool====================
app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
