var BASE_CHILDREN_OUT_SCHOOL_API_PATH = "/api/v1/children-out-school"

var schoolData = [];

module.exports.init = (app) => {
    //=======================F03 /info=====================
    app.get("/info/children-out-school", (req, res) => {
        res.sendStatus(200);
        res.send(
        `<html>
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

    app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH  + "/loadInitialData", (req, res) => {
        schoolData = [
            {
                "country":"argentina",
                "year":1970,
                "children-out-school-male":94757,
                "children-out-school-female":61145,
                "children-out-school-total":155902
            },
            {
                "country":"italy",
                "year":1976,
                "children-out-school-male":55165,
                "children-out-school-female":18496,
                "children-out-school-total":73661
            },
            {
                "country":"spain",
                "year":2018,
                "children-out-school-male":50956,
                "children-out-school-female":40830,
                "children-out-school-total":91786
            },
            {
                "country":"france",
                "year":2016,
                "children-out-school-male":6482,
                "children-out-school-female":523,
                "children-out-school-total":7005
            },
            {
                "country":"greece",
                "year":2017,
                "children-out-school-male":4374,
                "children-out-school-female":3774,
                "children-out-school-total":8148
            },
            {
                "country":"angola",
                "year":2011,
                "children-out-school-male":170490,
                "children-out-school-female":603347,
                "children-out-school-total":773837
            }
        ];
        console.log(`Initial data: <${JSON.stringify(schoolData, null, 2)}>`);
        res.sendStatus(200);
      });
      
    //6.1 GET: Devuelve la lista de recursos (array JSON)
    app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req,res)=>{
        if (schoolData.length != 0) {
            res.send(JSON.stringify(schoolData, null, 2));
            return res.sendStatus(200);
        }
        else {
            res.send("No data found");
            return res.sendStatus(404);
          }
    });
    
    //6.2 POST: Crea un nuevo recurso
    app.post(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req,res)=>{
        var newData = req.body;
        var b = false;
    
      if (schoolData.length != 0) {  //Si hay datos iniciales
        for (var data of schoolData) {
          if (data.country === newData.country && data.year === newData.year) {
            b = true;  //Existe el recurso
          }
        }
        if (b) {
          res.send("Ya existe un recurso con la misma fecha y país");
          return res.sendStatus(409);
    
        } else if (!newData.country || !newData.year || !newData['children-out-school-male'] || !newData['children-out-school-female'] || !newData['children-out-school-total']) {
          res.send("Missing parameters");
          return res.sendStatus(400);
    
        } else {
          schoolData.push(newData);
          res.send(`Se ha añadido el recurso <${JSON.stringify(newData, null, 2)}>`);
          res.sendStatus(201);
        }
        //si no hay datos iniciales
      } else if (!newData.country || !newData.year || !newData['children-out-school-male'] || !newData['children-out-school-female'] || !newData['children-out-school-total']) {
        res.send("Faltan datos para crear el recurso");
        res.sendStatus(400);
    
      } else {
        schoolData.push(newData);
        res.send(`Se ha añadido el recurso <${JSON.stringify(newData, null, 2)}>`);
        res.sendStatus(201);
      }
    });
    
    //6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
    app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req,res) => {
        var req_data = req.params;
        
        console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
        for (var data of schoolData){
            if (data.country === req_data.country && data.year === parseInt(req_data.year)){     
                return res.status(200).send(JSON.stringify(data,null,2));
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);  
      });
    
    //6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
    app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req,res) => {
        var del_data = req.params;
        for(var i=0; i < schoolData.length; i++){
            if(schoolData[i].country=== del_data.country && schoolData[i].year === parseInt(del_data.year)){
            //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
                schoolData.splice(i, 1); 
                res.send(`The resource: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
                return res.sendStatus(200);
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);
      });
    
    //6.5 PUT: Put a un recurso -> actualiza ese recurso
    app.put(BASE_CHILDREN_OUT_SCHOOL_API_PATH +"/:country/:year",(req,res)=>{
        var put_data = req.params; //variable con el recurso a actualizar
        var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    
        if (!newData.country || !newData.year || !newData['children-out-school-male'] || !newData['children-out-school-female'] || !newData['children-out-school-total']) {
            console.log("Faltan datos para actualizar el recurso");
            return res.sendStatus(400);
        }
        else{
            for(var i=0; i<schoolData.length; i++){
                if(schoolData[i].country == put_data.country && schoolData[i].year==put_data.year){
                    schoolData[i]=req.body;
                    res.send("Updated Data");
                    res.sendStatus(200);
                }
            }   
        }
    });
    
    
    //6.6 POST: Post a un recurso -> error de método no permitido
    app.post(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.8 DELETE: Borra todos los recursos
    app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req, res) => {
        schoolData.length = 0;
        res.send('Resources deleted');
        return res.sendStatus(200);
      })
};
