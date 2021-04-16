module.exports.init = (app) => {
    var BASE_CHILDREN_OUT_SCHOOL_API_PATH = "/api/v1/children-out-school"
    var Datastore = require("nedb");
    var db = new Datastore();

    var schoolData = [
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
        "country":"spain",
        "year":2017,
        "children-out-school-male":43451,
        "children-out-school-female":31428,
        "children-out-school-total":74969
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
        db.insert(schoolData);
        console.log(`Initial data: <${JSON.stringify(schoolData, null, 2)}>`);
        res.sendStatus(200);
        //res.send(JSON.stringify(schoolData, null, 2));
      });
      
    //GET: Devuelve la lista de recursos (array JSON)
    app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req,res)=>{
        console.log("New GET .../children-out-schoool");

        var query = req.query;

        //Obtenemos los offset y limit de la query, si estan vacios devuelven null (NaN)
        var offset = query.offset;
        var limit = query.limit;

        //Los quitamos de la query para no tener que parsearlos
        delete query.offset;
        delete query.limit;

        //Si la query contiene alguno de los atributos numerico, hay que pasarlos de string a int
        //Primero comprobamos si la query tiene alguno de estos atributos
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("children-out-school-male")){
            query.children_out_school_male = parseInt(query.children_out_school_male);
        }
        if(query.hasOwnProperty("children-out-school-female")){
            query.children_out_school_female = parseInt(query.children_out_school_female);
        }
        if(query.hasOwnProperty("children-out-school-total")){
            query.children_out_school_total = parseInt(query.children_out_school_total);
        }

        db.find(query).skip(offset).limit(limit).exec((err, data) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            data.forEach( (d) =>{
                delete d._id;
            });
            res.send(JSON.stringify(data, null, 2));
            console.log("Data sent:"+JSON.stringify(data, null, 2));
        });
        
        /*
        if (schoolData.length != 0) {
            res.send(JSON.stringify(schoolData, null, 2));
            return res.sendStatus(200);
        }
        else {
            res.send("No data found");
            return res.sendStatus(404);
          }
          */
    });

    //POST: Crea un nuevo recurso
    app.post(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req, res) => {
        console.log("New POST .../children-out-school");
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);

        db.find({"country":country, "year":year}).exec((err, data)=>{
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else {
                if(data.length == 0){
                    if (!newData.country 
                        || !newData.year 
                        || !newData['children-out-school-male'] 
                        || !newData['children-out-school-female'] 
                        || !newData['children-out-school-total']
                        || Object.keys(newData).length != 5) {
            
                        console.log("The data is not correctly provided");
                        return res.sendStatus(400);
                    }
                    else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }
                }
                else{
                    res.sendStatus(409);
                    console.log("There is already a resource with that country and year in the DB");
                }
            }   
        });
        /*
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);

        //Comprobamos si el recurso a crear ya existe
        for (var stat of schoolData) {
            if (stat.country === country && stat.date === date) {

                console.log("Conflict detected");
                return res.sendStatus(409);
            }
        }
        //Comprobamos los parametros
        if (!newData.country 
            || !newData.year 
            || !newData['children-out-school-male'] 
            || !newData['children-out-school-female'] 
            || !newData['children-out-school-total']
            || Object.keys(newData).length != 5) {

            console.log("Missing parameters");
            return res.sendStatus(400);
        } else {
            //Añadimos
            console.log(`new school data to be added: <${JSON.stringify(newData, null, 2)}>`);
            schoolData.push(newData);
            return res.sendStatus(201);
        }
        */
    });
/*
//GET children-out-school/:country
app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH+ "/:country", (req, res) => {
	console.log("New GET .../children-out-school/:country");

	var country = req.params.country;
	var query = {"country":country};

	db.find(query).exec((err,data) => {
        if(err){
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
        }
        else{
		    if (data.length >= 1) {
			    delete data[0]._id;
                res.sendStatus(200);
			    res.send(JSON.stringify(data, null, 2));
			    console.log("Data sent:"+JSON.stringify(data, null, 2));
            } 
            else {
			    res.sendStatus(404);
			    console.log("The data requested is empty");
		    }
        }
	});
});
*/
//GET children-out-school/:country/:year
app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH+ "/:country/:year", (req, res) => {
	console.log("New GET .../children-out-school/:country");

	var country = req.params.country;
    var year = req.params.year;
	var query = {"country":country, "year":parseInt(year)};

	db.find(query).exec((err,data) => {
        if(err){
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
        }
        else{
		    if (data.length >= 1) {
			    delete data[0]._id;
			    res.status(200).send(JSON.stringify(data[0], null, 2));
			    console.log("Data sent:"+JSON.stringify(data[0], null, 2));
		    } 
            else {
			    res.sendStatus(404);
			    console.log("The data requested is empty");
		    }
        }   
	});
});

/*
    //GET: Get a un recurso -> devuelve ese recurso(objeto JSON)
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
    app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH +"/:country/:year", (req,res) => {
        var del_data = req.params;
        for(var i=0; i < schoolData.length; i++){
            if(schoolData[i].country=== del_data.country && schoolData[i].year === parseInt(del_data.year)){
            //al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar
                schoolData.splice(i, 1); 
                res.send(`The country: <${del_data.country}> with year: <${del_data.year}> has been deleted`);
                return res.sendStatus(200);
            }
        }
        //si el recurso no existe:
        return res.sendStatus(404);
      });
*/

//DELETE children-out-school/:country/:year
app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
	console.log("New DELETE .../children-out-school/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var query = {"country":country, "year":parseInt(year)};

	db.remove(query, {multi:true}, (err, numRemoved) =>{
        if(err){
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
        }
        else{
		    if(numRemoved == 0){
			    res.sendStatus(404);
			    console.log("There is no such data in the database");
	    	}
		    else{
			    res.sendStatus(200);
			    console.log("Object removed");
		    }
        }
	});
});
/*
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
*/
//PUT children-out-school/:country/:year
app.put(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
	console.log("New PUT .../children-out-school/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newData = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (!newData.country 
        || !newData.year 
        || !newData['children-out-school-male'] 
        || !newData['children-out-school-female'] 
        || !newData['children-out-school-total'] 
        || country != newData.country 
        || year != newData.year
        || Object.keys(newData).length != 5){

        console.log("The data is not correctly provided");
        return res.sendStatus(400);
	} else {
		db.update(query,newData,(err,numReplaced) =>{
            if(err){
                console.error("ERROR accesing DB in PUT");
                res.sendStatus(500);
            }
            else{
			    if(numReplaced == 0){
				    res.sendStatus(404);
				    console.log("There is no such data in the database");

			    }
			    else{
				    res.sendStatus(200);
				    console.log("Database updated");
			    }
            }
		});
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
        console.log("New DELETE .../children-out-school");
        
        db.remove({}, { multi: true },  (err, numRemoved)=> {
            if (err) {
                console.error("ERROR deleting DB resources");
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    console.error("ERROR resources not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        /*
        schoolData.length = 0;
        res.send('Resources deleted');
        return res.sendStatus(200);
        */
      })
};
