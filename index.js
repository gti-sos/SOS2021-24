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

//Grupo 4: education-expenditures
var pathEducation = "/api/v1"
var apiEducation = "https://education-expenditures.herokuapp.com"

app.use(pathEducation, function(req, res){
	var url = apiEducation + req.baseUrl + req.url;
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(url).pipe(res));
});

//Grupo 2: wine-production-stats
var pathWineStats = "/api/v2/wine-production-stats"
var apiWineStats = "http://sos2021-02.herokuapp.com"

app.use(pathWineStats, function(req, res){
	var url = apiWineStats + req.baseUrl + req.url;
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(url).pipe(res));
});

//Grupo 2: oil-production-stats
var pathOilStats = "/api/v2/oil-production-stats"
var apiOilStats = "http://oilstats.herokuapp.com"

app.use(pathOilStats, function(req, res){
	var url = apiOilStats + req.baseUrl + req.url;
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(url).pipe(res));
});


//========================F02 /cool====================
app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
