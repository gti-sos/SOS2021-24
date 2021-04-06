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
    res.send(`<html>
        <style>
            table,td{ border: 1px solid black}
        </style>
            <body>
                <table class = default>
                    <caption>Children between 7-14 with employment</caption> 
                    <tr> 
                        <th>country</th>  <th>year</th> <th>percent-children-employment-t</th> <th>percent-children-employment-m</th> <th>percent-children-employment-f</th> 
                        </tr>   
                        
                        <tr>    
                            <th>argentina</th>   <th>2012 </th>  <td>5% </td>   <td>6.4% </td>  <td>3.5% </td> 
                        </tr> 
                        
                        <tr>  
                            <th>cameroon </th> <th>2011 </th><td>62% </td>	 <td>63.6% </td>  <td>60.4% </td> 
                        </tr> 
                        
                        <tr>
                            <th>morocco </th><th>2004 </th> <td>4.5% </td>	<td>6% </td> <td>3% </td>
                        </tr>   
                        
                        <tr>  
                            <th>costa_rica </th> <th>2016 </th>    <td>1.2% </td>    <td>1.9% </td>     <td>0.6% </td>  
                        </tr>       
                        
                        <tr>  
                            <th>georgia </th>  	<th>2006 </th>  <td>31.8% </td> <td>33.6%</td>  <td>29.9% </td>
                        </tr> 
                    </table> 
                </body> 
        </html>`);
});
app.get("/info/children-with-hiv", (req, res) => {
    res.send(`<html>
    <style>
        table,td{ border: 1px solid black}
    </style>
        <body>
            <table class = default> 
                <caption>Prevalence of HIV in young people between 0-14 years old</caption> 
                <tr> 
                    <th>country</th>  <th>year</th> <th>living-with</th> <th>newly-infected</th> <th>total-infected</th> 
                </tr>
                <tr> 
                    <th>france</th> <th>2016</th> <td>500</td> <td>100</td> <td>600</td> 
                </tr> 

                <tr> 
                    <th>angola </th> <th>2006 </th><td>17000</td> <td>5100 </td> <td>22100</td> 
                </tr> 

                <tr> 
                    <th>ethiopia </th><th>2004</th> <td>120000 </td> <td>15000 </td> <td>135000</td>
                </tr> 

                <tr>  
                    <th>morocco </th> <th>2003</th> <td>500 </td> <td>100 </td> <td>600</td>  
                </tr> 

                <tr>  
                    <th>spain </th> <th>2018</th> <td>100</td> <td>100</td> <td>200</td>
                </tr>  
            </table> 
        </body> 
</html>`);
});

//=====================F04=========================

//******************children-out-school*******************
//5.2  GET: CREAR 2 O MÁS RECURSOS
var schoolData = [];

app.get(BASE_API_PATH + "/children-out-school/loadInitialData", (req, res) => {
    schoolData = [
        {
            "country":"argentina",
            "year":"1970",
            "children-out-school-male":94757,
            "children-out-school-female":61145,
            "children-out-school-total":155902
        },
        {
            "country":"italy",
            "year":"1976",
            "children-out-school-male":55165,
            "children-out-school-female":18496,
            "children-out-school-total":73661
        },
        {
            "country":"spain",
            "year":"2018",
            "children-out-school-male":50956,
            "children-out-school-female":40830,
            "children-out-school-total":91786
        },
        {
            "country":"france",
            "year":"2016",
            "children-out-school-male":6482,
            "children-out-school-female":523,
            "children-out-school-total":7005
        },
        {
            "country":"greece",
            "year":"2017",
            "children-out-school-male":4374,
            "children-out-school-female":3774,
            "children-out-school-total":8148
        },
        {
            "country":"angola",
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
    return res.sendStatus(200);
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
    //si el recurso no existe:
    return res.sendStatus(404);  
  });

//6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
app.delete(BASE_API_PATH+ "/children-out-school/:country/:year", (req,res) => {
    var del_data = req.params;
    for(var i=0; i < schoolData.length; i++){
        if(schoolData[i].country=== del_data.country && schoolData[i].year === del_data.year){
        //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
            schoolData.splice(i, 1); 
            console.log(`The resource: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
            return res.sendStatus(200);
        }
    }
    //si el recurso no existe:
    return res.sendStatus(404);
  });

//6.5 PUT: Put a un recurso -> actualiza ese recurso
app.put(BASE_API_PATH + "/children-out-school/:country/:date", (req,res) => {
    var put_data = req.params; //variable con el recurso a actualizar
    var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    //var b = false;
  
   // if (!newData.country || !newData.year || !newData['children-out-school-male']|| !newData['children-out-school-female'] || !newData['children-out-school-total']){
     // console.log("Missing parameters");
      //return res.sendStatus(400);
    //} else {
      for(var i=0; i< schoolData.length; i++) {
        if(schoolData[i].country === put_data.country && schoolData[i].year === put_data.year){
          schoolData[i] = newData;
          //b = true;
          console.log("PUT successful");
          return res.sendStatus(200);
        }
      }
      //if(!b){
       // console.log("The resource does not exists");
       // return res.sendStatus(404);
     // }
    //}
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
//******************children-employment*******************
//5.2  GET: CREAR 2 O MÁS RECURSOS
var employmentData = [];

app.get(BASE_API_PATH + "/children-employment/loadInitialData", (req, res) => {
    employmentData = [
        {
            "country":"argentina",
            "year":"2012",
            "percent-children-employment-m":6.4,
            "percent-children-employment-f":3.5,
            "percent-children-employment-t":5
        },
        {
            "country":"cameroon",
            "year":"2011",
            "percent-children-employment-m":63.6,
            "percent-children-employment-f":60.4,
            "percent-children-employment-t":62
        },
        {
            "country":"morocco",
            "year":"2004",
            "percent-children-employment-m":6,
            "percent-children-employment-f":3,
            "percent-children-employment-t":4.5
        },
        {
            "country":"costa-rica",
            "year":"2016",
            "percent-children-employment-m":1.9,
            "percent-children-employment-f":0.6,
            "percent-children-employment-t":1.2
        },
        {
            "country":"georgia",
            "year":"2006",
            "percent-children-employment-m":33.6,
            "percent-children-employment-f":29.9,
            "percent-children-employment-t":31.8
        },
      
    ];
    console.log(`Initial data: <${JSON.stringify(employmentData, null, 2)}>`);
    res.sendStatus(200);
  });
  
//6.1 GET: Devuelve la lista de recursos (array JSON)
app.get(BASE_API_PATH+"/children-employment", (req,res)=>{
	res.send(JSON.stringify(employmentData, null, 2));
    return res.sendStatus(200);
});

//6.2 POST: Crea un nuevo recurso
app.post(BASE_API_PATH+"/children-employment", (req,res)=>{
	var newEmploymentData =req.body;
	employmentData.push(newEmploymentData);
    console.log("Resource created");
	res.sendStatus(201);
});

//6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
app.get(BASE_API_PATH+ "/children-employment/:country/:year", (req,res) => {
    var req_data = req.params;
    
    console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
    for (var data of employmentData){
        if (data.country === req_data.country && data.year === req_data.year){     
            return res.status(200).send(JSON.stringify(data,null,2));
        }
    }
    //si el recurso no existe:
    return res.sendStatus(404);  
  });

//6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
app.delete(BASE_API_PATH+ "/children-employment/:country/:year", (req,res) => {
    var del_data = req.params;
    for(var i=0; i < employmentData.length; i++){
        if(employmentData[i].country=== del_data.country && employmentData[i].year === del_data.year){
        //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
            employmentData.splice(i, 1); 
            console.log(`The resource: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
            return res.sendStatus(200);
        }
    }
    //si el recurso no existe:
    return res.sendStatus(404);
  });

//6.5 PUT: Put a un recurso -> actualiza ese recurso
app.put(BASE_API_PATH + "/children-employment/:country/:date", (req,res) => {
    var put_data = req.params; //variable con el recurso a actualizar
    var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    var b = false;
  
    if (!newData.country || !newData.year || !newData['percent-children-employment-t']|| !newData['percent-children-employment-m'] || !newData['percent-children-emplyment-f']){
      console.log("Missing parameters");
      return res.sendStatus(400);
    } else {
      for(var i=0; i< employmentData.length; i++) {
        if(employmentData[i].country === put_data.country && employmentData[i].year === put_data.year){
            employmentData[i] = newData;
          b = true;
          console.log("PUT successful");
          return res.sendStatus(200);
        }
      }
      if(!b){
        console.log("The resource does not exists");
        return res.sendStatus(404);
      }
    }
  });
//6.6 POST: Post a un recurso -> error de método no permitido
app.post(BASE_API_PATH + "/children-employment/:country/:year", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  })

//6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
app.put(BASE_API_PATH + "/children-employment", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  })

//6.8 DELETE: Borra todos los recursos
app.delete(BASE_API_PATH + "/children-employment", (req, res) => {
    employmentData.length = 0;
    console.log('Resources deleted');
    return res.sendStatus(200);
  })

    //******************children-with-HIV*******************
//5.2  GET: CREAR 2 O MÁS RECURSOS
var HIVData = [];

app.get(BASE_API_PATH + "/children-with-hiv/loadInitialData", (req, res) => {
    HIVData = [
        {
            "country":"france",
            "year":"2016",
            "living-with":500,
            "newly-infected":100,
            "total-infected":600
        },
        {
            "country":"angola",
            "year":"2006",
            "living-with":17000,
            "newly-infected":5100,
            "total-infected":22100
        },
        {
            "country":"ethiopia",
            "year":"2004",
            "living-with":120000,
            "newly-infected":15000,
            "total-infected":135000
        },
        {
            "country":"morocco",
            "year":"2003",
            "living-with":500,
            "newly-infected":100,
            "total-infected":600
        },
        {
            "country":"spain",
            "year":"2016",
            "living-with":100,
            "newly-infected":100,
            "total-infected":200
        },
      
    ];
    console.log(`Initial data: <${JSON.stringify(HIVData, null, 2)}>`);
    res.sendStatus(200);
  });
  
//6.1 GET: Devuelve la lista de recursos (array JSON)
app.get(BASE_API_PATH+"/children-with-hiv", (req,res)=>{
	res.send(JSON.stringify(HIVData, null, 2));
    return res.sendStatus(200);
});

//6.2 POST: Crea un nuevo recurso
app.post(BASE_API_PATH+"/children-with-hiv", (req,res)=>{
	var newHIVData =req.body;
	HIVData.push(newHIVData);
    console.log("Resource created");
	res.sendStatus(201);
});

//6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
app.get(BASE_API_PATH+ "/children-with-hiv/:country/:year", (req,res) => {
    var req_data = req.params;
    
    console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
    for (var data of HIVData){
        if (data.country === req_data.country && data.year === req_data.year){     
            return res.status(200).send(JSON.stringify(data,null,2));
        }
    }
    //si el recurso no existe:
    return res.sendStatus(404);  
  });

//6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
app.delete(BASE_API_PATH+ "/children-with-hiv/:country/:year", (req,res) => {
    var del_data = req.params;
    for(var i=0; i < HIVData.length; i++){
        if(HIVData[i].country=== del_data.country && HIVData[i].year === del_data.year){
        //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
            HIVData.splice(i, 1); 
            console.log(`The resource: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
            return res.sendStatus(200);
        }
    }
    //si el recurso no existe:
    return res.sendStatus(404);
  });

//6.5 PUT: Put a un recurso -> actualiza ese recurso

app.put(BASE_API_PATH + "/children-with-hiv/:country/:date", (req,res) => {
    var put_data = req.params; //variable con el recurso a actualizar
    var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    var b = false;
  
    if (!newData.country || !newData.year || !newData['living-with']|| !newData['newly-infected'] || !newData['total-infected']){
      console.log("Missing parameters");
      return res.sendStatus(400);
    } else {
      for(var i=0; i< HIVData.length; i++) {
        if(HIVData[i].country === put_data.country && HIVData[i].year === put_data.year){
            HIVData[i] = newData;
          b = true;
          console.log("PUT successful");
          return res.sendStatus(200);
        }
      }
      if(!b){
        console.log("The resource does not exists");
        return res.sendStatus(404);
      }
    }
  });

//6.6 POST: Post a un recurso -> error de método no permitido
app.post(BASE_API_PATH + "/children-with-hiv/:country/:year", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  })

//6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
app.put(BASE_API_PATH + "/children-with-hiv", (req, res) => {
    console.log("Method not allowed");
    return res.sendStatus(405);
  })

//6.8 DELETE: Borra todos los recursos
app.delete(BASE_API_PATH + "/children-with-hiv", (req, res) => {
    HIVData.length = 0;
    console.log('Resources deleted');
    return res.sendStatus(200);
  })

//=================================================
app.listen(port,() => {
	console.log("Server already listening on port " + port);
});
