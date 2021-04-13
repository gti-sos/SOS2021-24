var BASE_CHILDREN_WITH_HIV_API_PATH = "/api/v1/children-with-hiv"

var HIVData = [];

module.exports.init = (app) => {
    //=======================F03 /info=====================
    app.get("/info/children-with-hiv", (req, res) => {
        res.sendStatus(200);
        res.send(
            `<html>
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

    app.get(BASE_CHILDREN_WITH_HIV_API_PATH  + "/loadInitialData", (req, res) => {
        HIVData = [
            {
            "country":"france",
            "year":2016,
            "living-with":500,
            "newly-infected":100,
            "total-infected":600
        },
        {
            "country":"angola",
            "year":2006,
            "living-with":17000,
            "newly-infected":5100,
            "total-infected":22100
        },
        {
            "country":"ethiopia",
            "year":2004,
            "living-with":120000,
            "newly-infected":15000,
            "total-infected":135000
        },
        {
            "country":"morocco",
            "year":2003,
            "living-with":500,
            "newly-infected":100,
            "total-infected":600
        },
        {
            "country":"spain",
            "year":2016,
            "living-with":100,
            "newly-infected":100,
            "total-infected":200
        }
    ];
     console.log(`Initial data: <${JSON.stringify(HIVData, null, 2)}>`);
    res.sendStatus(200);
      });
      
    //6.1 GET: Devuelve la lista de recursos (array JSON)
    app.get(BASE_CHILDREN_WITH_HIV_API_PATH, (req,res)=>{
        if (HIVData.length != 0) {
            res.send(JSON.stringify(HIVData, null, 2));
            return res.sendStatus(200);
        }
        else {
            res.send("No data found");
            return res.sendStatus(404);
          }
    });
    
    //6.2 POST: Crea un nuevo recurso
    
    app.post(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);

        //Comprobamos si el recurso a crear ya existe
        for (var stat of HIVData) {
            if (stat.country === country && stat.date === date) {

                console.log("Conflict detected");
                return res.sendStatus(409);
            }
        }
        //Comprobamos los parametros
        if (!newData.country 
            || !newData.year 
            || !newData['living-with'] 
            || !newData['newly-infected'] 
            || !newData['total-infected']
            || Object.keys(newData).length != 5) {

            console.log("Missing parameters");
            return res.sendStatus(400);
        } else {
            //Añadimos
            console.log(`new hiv data to be added: <${JSON.stringify(newData, null, 2)}>`);
            HIVData.push(newData);
            return res.sendStatus(201);
        }
    });

    //6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
    app.get(BASE_CHILDREN_WITH_HIV_API_PATH + "/:country/:year", (req,res) => {
        var req_data = req.params;
        
        console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
        for (var data of HIVData){
            if (data.country === req_data.country && data.year === parseInt(req_data.year)){     
                return res.status(200).send(JSON.stringify(data,null,2));
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);  
      });
    
    //6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
    app.delete(BASE_CHILDREN_WITH_HIV_API_PATH +"/:country/:year", (req,res) => {
        var del_data = req.params;
        for(var i=0; i < HIVData.length; i++){
            if(HIVData[i].country=== del_data.country && HIVData[i].year === parseInt(del_data.year)){
            //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
                HIVData.splice(i, 1); 
                res.send(`The country: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
                return res.sendStatus(200);
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);
      });
    
    //6.5 PUT: Put a un recurso -> actualiza ese recurso
    app.put(BASE_CHILDREN_WITH_HIV_API_PATH +"/:country/:year",(req,res)=>{
        var put_data = req.params; //variable con el recurso a actualizar
        var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    
        if (!newData.country || !newData.year || !newData['living-with'] || !newData['newly-infected'] || !newData['total-infected']) {
            console.log("Faltan datos para actualizar el recurso");
            return res.sendStatus(400);
        }
        else{
            for(var i=0; i<HIVData.length; i++){
                if(HIVData[i].country == put_data.country && HIVData[i].year==put_data.year){
                    HIVData[i]=req.body;
                    res.send("Updated Data");
                    res.sendStatus(200);
                }
            }   
        }
    });
    
    
    //6.6 POST: Post a un recurso -> error de método no permitido
    app.post(BASE_CHILDREN_WITH_HIV_API_PATH + "/:country/:year", (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.8 DELETE: Borra todos los recursos
    app.delete(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        HIVData.length = 0;
        res.send('Resources deleted');
        return res.sendStatus(200);
      })
};