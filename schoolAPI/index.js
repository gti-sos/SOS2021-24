module.exports.init = (app) => {
    var BASE_CHILDREN_OUT_SCHOOL_API_PATH = "/api/v1/children-out-school"
    var Datastore = require("nedb");
    var path = require('path');

    var dbFile = path.join(__dirname, 'children-out-school.db');
    var db = new Datastore({filename: dbFile, autoload: true });

    var schoolData = [
    {
        "country":"argentina",
        "year":1970,
        "children_out_school_male":94757,
        "children_out_school_female":61145,
        "children_out_school_total":155902
    },
    {
        "country":"italy",
        "year":1976,
        "children_out_school_male":55165,
        "children_out_school_female":18496,
        "children_out_school_total":73661
    },
    {
        "country":"italy",
        "year":2018,
        "children_out_school_male":43567,
        "children_out_school_female":45651,
        "children_out_school_total":89218
    },
    {
        "country":"spain",
        "year":2018,
        "children_out_school_male":50956,
        "children_out_school_female":40830,
        "children_out_school_total":91786
    },
    {
        "country":"spain",
        "year":2017,
        "children_out_school_male":43451,
        "children_out_school_female":31428,
        "children_out_school_total":74969
    },
    {
        "country":"france",
        "year":2016,
        "children_out_school_male":6482,
        "children_out_school_female":523,
        "children_out_school_total":7005
    },
    {
        "country":"greece",
        "year":2017,
        "children_out_school_male":4374,
        "children_out_school_female":3774,
        "children_out_school_total":8148
    },
    {
        "country":"angola",
        "year":2011,
        "children_out_school_male":170490,
        "children_out_school_female":603347,
        "children_out_school_total":773837
    }
];

//Delete the database
db.remove({}, {multi: true});

//GET loadInitialData children-out-school
app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH  + "/loadInitialData", (req, res) => {
    //Delete the database
    db.remove({}, {multi: true});
    db.insert(schoolData);
    console.log(`Initial data: <${JSON.stringify(schoolData, null, 2)}>`);
    res.sendStatus(200);
});
      
//GET children-out-school Devuelve la lista de recursos (array JSON)  w/ query
app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req,res)=>{
    console.log("New GET .../children-out-school");

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
        if(query.hasOwnProperty("children_out_school_male")){
            query.children_out_school_male = parseInt(query.children_out_school_male);
        }
        if(query.hasOwnProperty("children_out_school_female")){
            query.children_out_school_female = parseInt(query.children_out_school_female);
        }
        if(query.hasOwnProperty("children_out_school_total")){
            query.children_out_school_total = parseInt(query.children_out_school_total);
        }

        db.find(query).skip(offset).limit(limit).exec((err, data) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(data.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    data.forEach( (d) =>{
                    delete d._id;
                    });

                    res.send(JSON.stringify(data, null, 2));
                    console.log("Data sent:"+JSON.stringify(data, null, 2));
                }
            }
        });
    });

//POST children-out-school: Crea un nuevo recurso
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
                        || !newData['children_out_school_male'] 
                        || !newData['children_out_school_female'] 
                        || !newData['children_out_school_total']
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
    });

//GET children-out-school/:country/:year
app.get(BASE_CHILDREN_OUT_SCHOOL_API_PATH+ "/:country/:year", (req, res) => {
	console.log("New GET .../children-out-school/:country/:year");

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

//DELETE children-out-school/:country/:year
app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
	console.log("New DELETE .../children-out-school/:country/:year");

	var country = req.params.country;
	var year = parseInt(req.params.year);
	//var query = {"country":country, "year":year};

	db.remove({country: country, year: year}, {multi:true}, (err, numRemoved) =>{
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

//PUT children-out-school/:country/:year
app.put(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
	console.log("New PUT .../children-out-school/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newData = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (!newData.country 
        || !newData.year 
        || !newData['children_out_school_male'] 
        || !newData['children_out_school_female'] 
        || !newData['children_out_school_total'] 
        || country != newData.country 
        || year != newData.year
        || Object.keys(newData).length != 5){

        console.log("The data is not correctly provided");
        return res.sendStatus(400);
	} 
    else {
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
    
//POST: Post a un recurso -> error método no permitido
app.post(BASE_CHILDREN_OUT_SCHOOL_API_PATH + "/:country/:year", (req, res) => {
    console.log("Method not allowed");
    res.sendStatus(405);
});
    
//PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req, res) => {
        console.log("Method not allowed");
        res.sendStatus(405);
      });
    
//DELETE children-out-school: Borra todos los recursos
    app.delete(BASE_CHILDREN_OUT_SCHOOL_API_PATH, (req, res) => {
        console.log("New DELETE .../children-out-school");
        
        db.remove({}, {multi: true },  (err, numRemoved)=> {
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
      })
};
