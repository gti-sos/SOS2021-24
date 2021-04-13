var BASE_CHILDREN_EMPLOYMENT_API_PATH = "/api/v1/children-employment"

var employmentData = [];

module.exports.init = (app) => {

    app.get("/info/children-employment", (req, res) => {
        res.sendStatus(200);
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
    
    
    
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/loadInitialData", (req, res) => {
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
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req,res)=>{
        if (employmentData.length != 0) {
            res.send(JSON.stringify(employmentData, null, 2));
            return res.sendStatus(200);
        }
        else {
            res.send("No data found");
            return res.sendStatus(404);
          }
    });
    /*
    //6.2 POST: Crea un nuevo recurso
    app.post(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req,res)=>{
        var newData = req.body;
        var b = false;
    
      if (employmentData.length != 0) {  //Si hay datos iniciales
        for (var data of employmentData) {
          if (data.country === newData.country && data.year === newData.year) {
            b = true;  //Existe el recurso
          }
        }
        if (b) {
          res.send("Ya existe un recurso con la misma fecha y país");
          return res.sendStatus(409);
    
        } 
        else if (!newData.country || !newData.year || !newData['percent-children-employment-m'] || !newData['percent-children-employment-f'] || !newData['percent-children-employment-t']) {
          res.send("Missing parameters");
          res.sendStatus(400);
    
        } 
        else {
          employmentData.push(newData);
          res.send(`Se ha añadido el recurso <${JSON.stringify(newData, null, 2)}>`);
          res.sendStatus(201);
        }
        //si no hay datos iniciales
      }
       else if (!newData.country || !newData.year || !newData['percent-children-employment-m'] || !newData['percent-children-employment-f'] || !newData['percent-children-employment-t']) {
        res.send("Faltan datos para crear el recurso");
        res.sendStatus(400);
    
      } 
      else {
        employmentData.push(newData);
        res.send(`Se ha añadido el recurso <${JSON.stringify(newData, null, 2)}>`);
        res.sendStatus(201);
      }
    });
    */

    app.post(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);

        //Comprobamos si el recurso a crear ya existe
        for (var stat of employmentData) {
            if (stat.country === country && stat.date === date) {

                console.log("Conflict detected");
                return res.sendStatus(409);
            }
        }
        //Comprobamos los parametros
        if (!newData.country 
            || !newData.year 
            || !newData['percent-children-employment-m'] 
            || !newData['percent-children-employment-f'] 
            || !newData['percent-children-employment-t']
            || Object.keys(newData).length != 5) {

            console.log("Missing parameters");
            return res.sendStatus(400);
        } else {
            //Añadimos
            console.log(`new employment data to be added: <${JSON.stringify(newData, null, 2)}>`);
            employmentData.push(newData);
            return res.sendStatus(201);
        }
    });

    //6.3 GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req,res) => {
        var req_data = req.params;
        
        console.log(`GET resource by country: <${req_data.country}> and year: <${req_data.year}>`);
        for (var data of employmentData){
            if (data.country === req_data.country && data.year === parseInt(req_data.year)){     
                return res.status(200).send(JSON.stringify(data,null,2));
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);  
      });
    
    //6.4 DELETE: Delete a un recurso -> borra ese recurso(JSON)
    app.delete(BASE_CHILDREN_EMPLOYMENT_API_PATH +"/:country/:year", (req,res) => {
        var del_data = req.params;
        for(var i=0; i < employmentData.length; i++){
            if(employmentData[i].country=== del_data.country && employmentData[i].year === parseInt(del_data.year)){
            //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
                employmentData.splice(i, 1); 
                res.send(`The country: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
                return res.sendStatus(200);
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);
      });
    
    //6.5 PUT: Put a un recurso -> actualiza ese recurso
    app.put(BASE_CHILDREN_EMPLOYMENT_API_PATH +"/:country/:year",(req,res)=>{
        var put_data = req.params; //variable con el recurso a actualizar
        var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    
        if (!newData.country || !newData.year || !newData['percent-children-employment-m'] || !newData['percent-children-employment-f'] || !newData['percent-children-employment-t']) {
            console.log("Faltan datos para actualizar el recurso");
            return res.sendStatus(400);
        }
        else{
            for(var i=0; i<employmentData.length; i++){
                if(employmentData[i].country == put_data.country && employmentData[i].year==put_data.year){
                    employmentData[i]=req.body;
                    res.send("Updated Data");
                    res.sendStatus(200);
                }
            }   
        }
    });
    
    
    //6.6 POST: Post a un recurso -> error de método no permitido
    app.post(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.7 PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        console.log("Method not allowed");
        return res.sendStatus(405);
      })
    
    //6.8 DELETE: Borra todos los recursos
    app.delete(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        employmentData.length = 0;
        res.send('Resources deleted');
        return res.sendStatus(200);
      })


};