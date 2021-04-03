var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v1";

app.use(bodyParser.json()); 
app.use(express.json());

app.use("/", express.static(path.join(__dirname,"public")));

//========================F02 /cool====================
app.get("/cool", (request,response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
})//cada vez que se hace un get por http 

//=======================F03 /info=====================
app.get("/info/children-out-school", (req, res) => {
    res.send(`<html>
        <style>
            table,td{ border: 1px solid black}
        </style>
            <body>
                <table class = default> 
                    <caption>Children out of school by year and country</caption> 
                    <tr> 
                        <th>country</th>  <th>year</th> <th>children-out-school-male</th> <th>children-out-school-female</th> <th>children-out-school-total</th> 
                    </tr>
                    <tr> 
                        <th>Argentina</th> <th>1970</th> <td>94757</td> <td>61145</td> <td>155902</td> 
                    </tr> 

                    <tr> 
                        <th>Italy </th> <th>1976 </th><td>55165</td> <td>18496 </td> <td>73661</td> 
                    </tr> 

                    <tr> 
                        <th>Spain </th><th>2018</th> <td>50956 </td> <td>40830 </td> <td>91786</td>
                    </tr> 

                    <tr>  
                        <th>France </th> <th>2016</th> <td>6482 </td> <td>523 </td> <td>7005</td>  
                    </tr> 

                    <tr>  
                        <th>Greece </th> <th>2017</th> <td>4374</td> <td>3774</td> <td>8148</td>
                    </tr> 

                    <tr> 
                        <th>Angola</th> <th>2011</th><td>170490</td><td>603347</td><td>773837</td> 
                    </tr> 
                </table> 
            </body> 
    </html>`);
});
app.get("/info/children-employment", (req, res) => {
    res.send("<html><style>table,td{ border: 1px solid black}</style><body><table class = default><caption>Children between 7-14 with employment</caption> <tr> <th>country      </th>  <th>year      </th> <th>children_employment-t </th> <th>children_employment-m   </th> <th>children_employment-f </th> </tr>   <tr>    <th>argentina</th>   <th>2012 </th>  <td>5% </td>   <td>6.4% </td>  <td>3.5% </td> </tr> <tr>  <th>cameroon </th> <th>2011 </th><td>62% </td>	 <td>63.6% </td>  <td>60.4% </td> </tr> <tr><th>morocco </th><th>2004 </th> <td>4.5% </td>	<td>6% </td> <td>3% </td></tr>   <tr>  <th>costa_rica </th>	   <th>2016 </th>     <td>1.2% </td>    <td>1.9% </td>     <td>0.6% </td>  </tr>        <tr>  <th>georgia </th>  	<th>2006 </th>  <td>31.8% </td> <td>33.6%</td>  <td>29.9% </td></tr> </table> </body> </html>");
});
app.get("/info/children-with-hiv", (req, res) => {
    res.send("<html><style>table,td{ border: 1px solid black}</style><body><table class = default><caption>Children between 0-14 with HIV by year and country</caption> <tr> <th>country      </th>  <th>year      </th> <th>living-with  </th> <th>newly-infected  </th> <th>total-infected  </th> </tr>   <tr>    <th>france</th>   <th>2016 </th>  <td>500 </td>   <td>100 </td>  <td>600 </td> </tr> <tr>  <th>angola </th> <th>2006 </th><td>17000 </td>	 <td>5100 </td>  <td>221000 </td> </tr> <tr><th>ethiopia </th><th>2004 </th> <td>120000 </td>	<td>15000 </td> <td>135000 </td></tr>   <tr>  <th>morocco </th>	   <th>2003 </th>     <td>500 </td>    <td>100 </td>     <td>600 </td>  </tr>        <tr>  <th>spain </th>  	<th>2018 </th>  <td>100 </td> <td>100</td>  <td>200 </td></tr> </table> </body> </html>");
});

//=====================F04=========================

//******************children-out-school*******************
//5.2  GET: CREAR 2 O MÁS RECURSOS
var schoolData = [];

app.get(BASE_API_PATH + "/children-out-school/loadInitialData", (req, res) => {
    schoolData = [
        {
            "country":"Argentina",
            "year":"1970",
            "children-out-school-male":94757,
            "children-out-school-female":61145,
            "children-out-school-total":155902
        },
        {
            "country":"Italy",
            "year":"1976",
            "children-out-school-male":55165,
            "children-out-school-female":18496,
            "children-out-school-total":73661
        },
        {
            "country":"Spain",
            "year":"2018",
            "children-out-school-male":50956,
            "children-out-school-female":40830,
            "children-out-school-total":91786
        },
        {
            "country":"France",
            "year":"2016",
            "children-out-school-male":6482,
            "children-out-school-female":523,
            "children-out-school-total":7005
        },
        {
            "country":"Greece",
            "year":"2017",
            "children-out-school-male":4374,
            "children-out-school-female":3774,
            "children-out-school-total":8148
        },
        {
            "country":"Angola",
            "year":"2011",
            "children-out-school-male":170490,
            "children-out-school-female":603347,
            "children-out-school-total":773837
        }
    ];
    console.log(`Initial data: <${JSON.stringify(schoolData, null, 2)}>`);
    res.sendStatus(200);
  });
  
//6.1 GET: Devuelve la lista de recursos (array JSON)
app.get(BASE_API_PATH+"/children-out-school", (req,res)=>{
	res.send(JSON.stringify(schoolData, null, 2));
    res.sendStatus(200);
});

//6.2 POST: Crea un nuevo recurso
app.post(BASE_API_PATH+"/children-out-school", (req,res)=>{
	var newSchoolData =req.body;
	schoolData.push(newSchoolData);
    console.log("Resource created");
	res.sendStatus(201);
});

//6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
app.get(BASE_API_PATH+ "/children-out-school/:country/:year", (req,res) => {
    var req_data = req.params;
    
    console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
    for (var data of schoolData){
      if (data.country === req_data.country && data.year === req_data.year){     
        return res.status(200).send(JSON.stringify(data,null,2));
      }
    }
    //return res.sendStatus(404);  
  });

//6.6 POST: Post a un recurso -> error de método no permitido
app.post(BASE_API_PATH + "/children-out-school/:country/:year", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  
  })

//6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
app.put(BASE_API_PATH + "/children-out-school", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  
  })

//6.8 DELETE: Borra todos los recursos
app.delete(BASE_API_PATH + "/children-out-school", (req, res) => {
    schoolData.length = 0;
    console.log('Resources deleted');
    return res.sendStatus(200);
  
  })

//=================================================
app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
