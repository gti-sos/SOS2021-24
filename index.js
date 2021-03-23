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
    res.send("<html><style>table,td{ border: 1px solid black}</style><body><table class = default><caption>Children out of school by year and country</caption> <tr> <th>country      </th>  <th>year      </th> <th>children-out-school-male  </th> <th>children-out-school-female  </th> <th>children-out-school-total  </th> </tr>   <tr>    <th>Argentina</th>   <th>1970 </th>  <td>94757 </td>   <td>61145 </td>  <td>155902 </td> </tr> <tr>  <th>Italy </th> <th>1976 </th><td>55165 </td>	 <td>18496 </td>  <td>73661 </td> </tr> <tr><th>Spain </th><th>2018 </th> <td>50956 </td>	<td>40830 </td> <td>91786 </td></tr>   <tr>  <th>France </th>	   <th>2016 </th>     <td>6482 </td>    <td>523 </td>     <td>7005 </td>  </tr>        <tr>  <th>Greece </th>  	<th>2017 </th>  <td>4374 </td> <td>3774</td>  <td>8147 </td></tr> <tr> <th>Angola</th> <th>2011</th><td>170490</td><td>603347</td><td>773837</td> </tr> </table> </body> </html>");
});
app.get("/info/children-employment", (req, res) => {
    res.send("<html><style>table,td{ border: 1px solid black}</style><body><table class = default><caption>Children between 7-14 with employment</caption> <tr> <th>country      </th>  <th>year      </th> <th>children_employment-t </th> <th>children_employment-m   </th> <th>children_employment-f </th> </tr>   <tr>    <th>argentina</th>   <th>2012 </th>  <td>5% </td>   <td>6.4% </td>  <td>3.5% </td> </tr> <tr>  <th>cameroon </th> <th>2011 </th><td>62% </td>	 <td>63.6% </td>  <td>60.4% </td> </tr> <tr><th>morocco </th><th>2004 </th> <td>4.5% </td>	<td>6% </td> <td>3% </td></tr>   <tr>  <th>costa_rica </th>	   <th>2016 </th>     <td>1.2% </td>    <td>1.9% </td>     <td>0.6% </td>  </tr>        <tr>  <th>georgia </th>  	<th>2006 </th>  <td>31.8% </td> <td>33.6%</td>  <td>29.9% </td></tr> </table> </body> </html>");
});
app.get("/info/children-with-hiv", (req, res) => {
    res.send("<html><style>table,td{ border: 1px solid black}</style><body><table class = default><caption>Children between 0-14 with HIV by year and country</caption> <tr> <th>country      </th>  <th>year      </th> <th>living-with  </th> <th>newly-infected  </th> <th>total-infected  </th> </tr>   <tr>    <th>france</th>   <th>2016 </th>  <td>500 </td>   <td>100 </td>  <td>600 </td> </tr> <tr>  <th>angola </th> <th>2006 </th><td>17000 </td>	 <td>5100 </td>  <td>221000 </td> </tr> <tr><th>ethiopia </th><th>2004 </th> <td>120000 </td>	<td>15000 </td> <td>135000 </td></tr>   <tr>  <th>morocco </th>	   <th>2003 </th>     <td>500 </td>    <td>100 </td>     <td>600 </td>  </tr>        <tr>  <th>spain </th>  	<th>2018 </th>  <td>100 </td> <td>100</td>  <td>200 </td></tr> </table> </body> </html>");
});

app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
