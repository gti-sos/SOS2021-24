module.exports.init = (app) => {
    var BASE_CHILDREN_EMPLOYMENT_API_PATH = "/api/v2/children-employment"
    var Datastore = require("nedb");
    var path = require('path');

    var dbFile = path.join(__dirname, "children_employment.db");
    var db = new Datastore({filename: dbFile, autoload: true });

    var employmentData = [
    {
        "country":"argentina",
        "year":2012,
        "percent_children_employment_m":6.4,
        "percent_children_employment_f":3.5,
        "percent_children_employment_t":5
    },
    {
        "country":"cameroon",
        "year":2011,
        "percent_children_employment_m":63.6,
        "percent_children_employment_f":60.4,
        "percent_children_employment_t":62
    },
    /*{
        "country":"morocco",
        "year":2004,
        "percent_children_employment_m":6,
        "percent_children_employment_f":3,
        "percent_children_employment_t":4.5
    },*/
    {
        "country":"costa-rica",
        "year":2016,
        "percent_children_employment_m":1.9,
        "percent_children_employment_f":0.6,
        "percent_children_employment_t":1.2
    },
    /*{
        "country":"georgia",
        "year":2006,
        "percent_children_employment_m":33.6,
        "percent_children_employment_f":29.9,
        "percent_children_employment_t":31.8
    },*/
    {
        "country":"bolivia",
        "year":2015,
        "percent_children_employment_m":15.2,
        "percent_children_employment_f":12.6,
        "percent_children_employment_t":13.9
    },
    {
        "country":"brazil",
        "year":2015,
        "percent_children_employment_m":3.5,
        "percent_children_employment_f":1.5,
        "percent_children_employment_t":2.5
    },
    {
        "country":"dominican_republic",
        "year":2014,
        "percent_children_employment_m":15.7,
        "percent_children_employment_f":10.3,
        "percent_children_employment_t":13.2
    },
    {
        "country":"guinea",
        "year":2012,
        "percent_children_employment_m":40.3,
        "percent_children_employment_f":35.9,
        "percent_children_employment_t":38.1
    },
    {
        "country":"india",
        "year":2012,
        "percent_children_employment_m":1.9,
        "percent_children_employment_f":1.6,
        "percent_children_employment_t":1.7
    },
    {
        "country":"jamaica",
        "year":2011,
        "percent_children_employment_m":6.4,
        "percent_children_employment_f":6,
        "percent_children_employment_t":6.2
    },
    {
        "country":"mali",
        "year":2013,
        "percent_children_employment_m":32.3,
        "percent_children_employment_f":27,
        "percent_children_employment_t":29.7
    },
    {
        "country":"pakistan",
        "year":2011,
        "percent_children_employment_m":12.5,
        "percent_children_employment_f":13.5,
        "percent_children_employment_t":13
    },
    {
        "country":"sudan",
        "year":2014,
        "percent_children_employment_m":34.3,
        "percent_children_employment_f":26.9,
        "percent_children_employment_t":30.6
    },
    {
        "country":"jordan",
        "year":2016,
        "percent_children_employment_m":2,
        "percent_children_employment_f":0.4,
        "percent_children_employment_t":1.2
    },
    {
        "country":"peru",
        "year":2015,
        "percent_children_employment_m":23.1,
        "percent_children_employment_f":22,
        "percent_children_employment_t":22.6
    }
];

//Delete the database
//db.remove({}, {multi: true});

//GET loadInitialData children-employment
app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH  + "/loadInitialData", (req, res) => {
    //Delete the database
    db.remove({}, {multi: true});
    db.insert(employmentData);
    console.log(`Initial data: <${JSON.stringify(employmentData, null, 2)}>`);
    res.sendStatus(200);
});
      
//GET children-employment Devuelve la lista de recursos (array JSON)  w/ query
app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req,res)=>{
    console.log("New GET .../children-employment");

        var query = req.query;

        //Obtenemos los offset y limit de la query, si estan vacios devuelven null (NaN)
        var offset = query.offset;
        var limit = query.limit;

        //Los quitamos de la query para no tener que parsearlos
        delete query.offset;
        delete query.limit;

        //Si la query contiene alguno de los atributos numerico, hay que pasarlos de string a int o float
        
        //Primero comprobamos si la query tiene alguno de estos atributos
        
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("percent_children_employment_m")){
            query.percent_children_employment_m = parseFloat(query.percent_children_employment_m);
        }
        if(query.hasOwnProperty("percent_children_employment_f")){
            query.percent_children_employment_f = parseFloat(query.percent_children_employment_f);
        }
        if(query.hasOwnProperty("percent_children_employment_t")){
            query.percent_children_employment_t = parseFloat(query.percent_children_employment_t);
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

//POST children-employment: Crea un nuevo recurso
    app.post(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        console.log("New POST .../children-employment");
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
                        || !newData['percent_children_employment_m'] 
                        || !newData['percent_children_employment_f'] 
                        || !newData['percent_children_employment_t']
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

//GET children-employment/:country/:year
app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH+ "/:country/:year", (req, res) => {
	console.log("New GET .../children-employment/:country/:year");

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

//DELETE children-employment/:country/:year
app.delete(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req, res) => {
	console.log("New DELETE .../children-employment/:country/:year");

	var country = req.params.country;
	var year = parseInt(req.params.year);

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

//PUT children-employment/:country/:year
app.put(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req, res) => {
	console.log("New PUT .../children-employment/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newData = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (!newData.country 
        || !newData.year 
        || !newData['percent_children_employment_m'] 
        || !newData['percent_children_employment_f'] 
        || !newData['percent_children_employment_t']
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
app.post(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req, res) => {
    console.log("Method not allowed");
    res.sendStatus(405);
});
    
//PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        console.log("Method not allowed");
        res.sendStatus(405);
      });
    
//DELETE children-employment: Borra todos los recursos
    app.delete(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req, res) => {
        console.log("New DELETE .../children-employment");
        
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
