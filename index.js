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
    res.send("<html><body><table class = default> <tr> <th>country</th>  <th>year</th> <th>children-out-school-male </th> <th>children-out-school-female </th> <th>children-out-school-total </th> </tr>   <tr>    <td>Argentina</td>   <td>1970 </td>  <td>94757 </td>   <td>61145 </td>  <td>155902 </td>  </tr> <tr>  <th>Switzerland </th> <th>2019 </th><th>195.93 </th>	 <th>129.7 </th>  <th>78.5 </th> </tr> <tr><th>Finland </th><th>2019 </th> <th>194.01 </th>	<th>112.3 </th> <th>77.2 </th></tr>   <tr>  <th>Australia </th>	   <th>2019 </th>     <th>191.13 </th>       <th>122.85 </th>     <th>57.24 </th>  </tr>        <tr>  <th>Austria </th>  	<th>2019 </th>  <th>191.05 </th>  	<th>96.7 </th>   <th>78.63 </th></tr> </table> </body> </html>");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});