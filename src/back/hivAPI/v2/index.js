module.exports.init = (app) => {
    var BASE_CHILDREN_WITH_HIV_API_PATH = "/api/v2/children-with-hiv"
    var Datastore = require("nedb");
    var path = require('path');

    var dbFile = path.join(__dirname, 'children-with-hiv.db');
    var db = new Datastore({filename: dbFile, autoload: true });

    var HIVData = [
        {
            "country":"France",
            "year":2017,
            "living_with":500,
            "newly_infected":100,
            "total_infected":600
        },
        {
            "country":"France",
            "year":2011,
            "living_with":500,
            "newly_infected":100,
            "total_infected":600
        },
        {
            "country":"France",
            "year":2013,
            "living_with":500,
            "newly_infected":100,
            "total_infected":600
        },
        {
            "country":"Angola",
            "year":2014,
            "living_with":29000,
            "newly_infected":5400,
            "total_infected":34400
        },
        {
            "country":"Angola",
            "year":2015,
            "living_with":30000,
            "newly_infected":5800,
            "total_infected":35800
        },
        {
            "country":"Angola",
            "year":2016,
            "living_with":31000,
            "newly_infected":5800,
            "total_infected":36800
        },
        {
            "country":"Ethiopia",
            "year":2015,
            "living_with":59000,
            "newly_infected":4000,
            "total_infected":63000
        },
        {
            "country":"Ethiopia",
            "year":2011,
            "living_with":83000,
            "newly_infected":11000,
            "total_infected":94000
        },
        {
            "country":"Ethiopia",
            "year":2012,
            "living_with":76000,
            "newly_infected":5500,
            "total_infected":81500
        },
        {
            "country":"Ethiopia",
            "year":2018,
            "living_with":47000,
            "newly_infected":2900,
            "total_infected":49900
        },
        {
            "country":"Eswatini",
            "year":2012,
            "living_with":15000,
            "newly_infected":1400,
            "total_infected":16400
        },
        {
            "country":"Eswatini",
            "year":2013,
            "living_with":14000,
            "newly_infected":1200,
            "total_infected":15200
        },
        {
            "country":"Morocco",
            "year":2014,
            "living_with":500,
            "newly_infected":100,
            "total_infected":600
        },
        {
            "country":"Morocco",
            "year":2016,
            "living_with":1000,
            "newly_infected":100,
            "total_infected":1100
        },
        {
            "country":"Spain",
            "year":2018,
            "living_with":100,
            "newly_infected":100,
            "total_infected":200
        },
        {
            "country":"Spain",
            "year":2017,
            "living_with":100,
            "newly_infected":100,
            "total_infected":200
        },
        {
            "country":"Spain",
            "year":2016,
            "living_with":100,
            "newly_infected":100,
            "total_infected":200
        }
];

//Delete the database
db.remove({}, {multi: true});

//GET loadInitialData children-with-hiv
app.get(BASE_CHILDREN_WITH_HIV_API_PATH  + "/loadInitialData", (req, res) => {
    //Delete the database
    db.remove({}, {multi: true});
    db.insert(HIVData);
    console.log(`Initial data: <${JSON.stringify(HIVData, null, 2)}>`);
    res.sendStatus(200);
});
      
//GET children-with-hiv Devuelve la lista de recursos (array JSON)  w/ query
app.get(BASE_CHILDREN_WITH_HIV_API_PATH, (req,res)=>{
    console.log("New GET .../children-with-hiv");

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
        if(query.hasOwnProperty("living_with")){
            query.living_with = parseInt(query.living_with);
        }
        if(query.hasOwnProperty("newly_infected")){
            query.newly_infected = parseInt(query.newly_infected);
        }
        if(query.hasOwnProperty("total_infected")){
            query.total_infected = parseInt(query.total_infected);
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

//POST children-with-hiv: Crea un nuevo recurso
    app.post(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        console.log("New POST .../children-with-hiv");
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
                        || !newData['living_with'] 
                        || !newData['newly_infected'] 
                        || !newData['total_infected']
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

//GET children-with-hiv/:country/:year
app.get(BASE_CHILDREN_WITH_HIV_API_PATH+ "/:country/:year", (req, res) => {
	console.log("New GET .../children-with-hiv/:country/:year");

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

//DELETE children-with-hiv/:country/:year
app.delete(BASE_CHILDREN_WITH_HIV_API_PATH + "/:country/:year", (req, res) => {
	console.log("New DELETE .../children-with-hiv/:country/:year");

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

//PUT children-with-hiv/:country/:year
app.put(BASE_CHILDREN_WITH_HIV_API_PATH + "/:country/:year", (req, res) => {
	console.log("New PUT .../children-with-hiv/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newData = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (!newData.country 
        || !newData.year 
        || !newData['living_with'] 
        || !newData['newly_infected'] 
        || !newData['total_infected'] 
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
app.post(BASE_CHILDREN_WITH_HIV_API_PATH + "/:country/:year", (req, res) => {
    console.log("Method not allowed");
    res.sendStatus(405);
});
    
//PUT: Put a la lista de recursos -> debe dar un error de método no permitido
    app.put(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        console.log("Method not allowed");
        res.sendStatus(405);
      });
    
//DELETE children-with-hiv: Borra todos los recursos
    app.delete(BASE_CHILDREN_WITH_HIV_API_PATH, (req, res) => {
        console.log("New DELETE .../children-with-hiv");
        
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
