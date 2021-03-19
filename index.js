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

app.get("/info/children-out-school", (req, res) => {
    res.send("<html><body><table class = default><caption>Children out of school by year and country</caption> <tr> <th>country</th>  <th>year</th> <th>children-out-school-male </th> <th>children-out-school-female </th> <th>children-out-school-total </th> </tr>   <tr>    <th>Argentina</th>   <th>1970 </th>  <th>94757 </th>   <th>61145 </th>  <th>155902 </th>  </tr> <tr>  <th>Italy </th> <th>1976 </th><th>55165 </th>	 <th>18496 </th>  <th>73661 </th> </tr> <tr><th>Spain </th><th>2018 </th> <th>50956 </th>	<th>40830 </th> <th>91786 </th></tr>   <tr>  <th>France </th>	   <th>2016 </th>     <th>6482 </th>    <th>523 </th>     <th>7005 </th>  </tr>        <tr>  <th>Greece </th>  	<th>2017 </th>  <th>4374 </th>  	<th>3774</th>   <th>8147 </th></tr> <tr> <th>Angola</th> <th>2011</th><th>170490</th><th>603347</th><th>773837</th> </tr> </table> </body> </html>");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});