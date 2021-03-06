//Modules required
var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var Datastore = require("nedb");
var cors = require("cors");
var request = require("request");
var request2 = require('request');

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
var remoteAPI1 = "http://api.quotable.io/random"
var pathQuote = "/random"
app.use(pathQuote, function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(remoteAPI1)).pipe(res);
});

//Grupo 10 food
var api10food = "https://sos2021-10.herokuapp.com";
var path10food = "/api/integration/foodconsumption-stats";

app.use(path10food, function(req, res) {
  var url = api10food + req.baseUrl + req.url;
  console.log('Piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


//========Proxys Javi============
//Grupo 23: unemployment-stats
var api23 = " https://sos2021-23.herokuapp.com";
var path23 = "/api/v2/unemployment-stats";

app.use(path23, function(req, res) {
  var url = api23 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 01: divorce-stats
var api01 = "https://sos2021-01.herokuapp.com";
var path01 = "/api/v1/divorce-stats";
app.use(path01, function(req, res) {
	var url = api01 + req.baseUrl + req.url;
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
  });

  
//Grupo 04: poverty risk
var api04 = "https://endpoint-poverty-risks.herokuapp.com";
var path04 = "/api/v1?y=2015";
app.use(path01, function(req, res) {
	var url = api01 + req.baseUrl + req.url;
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
  });

//Grupo 28: Plataform
var api28 = "https://sos2021-28.herokuapp.com";
var path28 = "/api/v1/platforms";
app.use(path28, function(req, res) {
	var url = api28 + req.baseUrl + req.url;
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
  });

//================Proxy de Juan================

 
app.use("/proxy", function(req, res) {
  var apiServerHost = "https://corona.lmao.ninja";
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//========================F02 /cool====================
app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
});


app.listen(port,() => {
	console.log("Server already listening on port " + port);
});

