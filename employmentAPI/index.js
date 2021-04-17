

module.exports.init = (app) => {

    var BASE_CHILDREN_EMPLOYMENT_API_PATH = "/api/v1/children-employment"
    var Datastore = require("nedb");
    var path = require("path");

    var dbfile = path.join(__dirname, "children_employment.db");
    var db = new Datastore({filename: dbfile, autoload: true});
    
    /*app.get("/info/children-employment", (req, res) => {
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
    */
    var employmentData = [
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
    
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/loadInitialData", (req, res) => {
        
        db.insert(employmentData);
        console.log(`Initial data: <${JSON.stringify(employmentData, null, 2)}>`);
        res.sendStatus(200);
        

      });
    

        


      //6.1 GET: Devuelve la lista de recursos (array JSON)
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH, (req,res)=>{
        console.log("New GET .../children-employment");

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
        if(query.hasOwnProperty("percent-children-employment-m")){
            query.percent_children_employment_m = parseInt(query.percent_children_employment_m);
        }
        if(query.hasOwnProperty("percent-children-employment-f")){
            query.percent_children_employment_f = parseInt(query.percent_children_employment_f);
        }
        if(query.hasOwnProperty("percent-children-employment-t")){
            query.percent_children_employment_t = parseInt(query.percent_children_employment_t);
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
            }else {
                if(data.length == 0){
                    if (!newData.country 
                        || !newData.year 
                        || !newData['percent-children-employment-m'] 
                        || !newData['percent-children-employment-f'] 
                        || !newData['percent-children-employment-t']
                        || Object.keys(newData).length != 5){
                        console.log("The data is not correctly provided");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }

                }else{
                    res.sendStatus(409);
                    console.log("There is already a resource with that country and year in the DB");
                }
            }




        });

        
    });

    //GET children-employment/:country/:year
    app.get(BASE_CHILDREN_EMPLOYMENT_API_PATH + "/:country/:year", (req,res) => {
        console.log("New GET .../children-employment/:country");
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
    app.delete(BASE_CHILDREN_EMPLOYMENT_API_PATH +"/:country/:year", (req,res) => {
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
    app.put(BASE_CHILDREN_EMPLOYMENT_API_PATH +"/:country/:year",(req,res)=>{
        console.log("New PUT .../children-employment/:country/:year");
        var country = req.params.country;
	    var year = req.params.year;
	    var newData = req.body;
	    var query = {"country":country, "year":parseInt(year)};
    
        if (!newData.country 
            || !newData.year 
            || !newData['percent-children-employment-m'] 
            || !newData['percent-children-employment-f'] 
            || !newData['percent-children-employment-t']
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