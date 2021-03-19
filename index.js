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
    res.send("<html><body><table class = default><caption>Children out of school by year and country</caption> <tr> <th>country</th>  <th>year</th> <th>children-out-school-male </th> <th>children-out-school-female </th> <th>children-out-school-total </th> </tr>   <tr>    <th>Argentina</th>   <th>1970 </th>  <th>94757 </th>   <th>61145 </th>  <th>155902 </th>  </tr> <tr>  <th>Italy </th> <th>1976 </th><th>55165 </th>	 <th>18496 </th>  <th>73661 </th> </tr> <tr><th>Spain </th><th>2018 </th> <th>50956 </th>	<th>40830 </th> <th>91786 </th></tr>   <tr>  <th>France </th>	   <th>2019 </th>     <th>191.13 </th>       <th>122.85 </th>     <th>57.24 </th>  </tr>        <tr>  <th>Austria </th>  	<th>2019 </th>  <th>191.05 </th>  	<th>96.7 </th>   <th>78.63 </th></tr> </table> </body> </html>");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});