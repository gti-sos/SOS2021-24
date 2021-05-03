<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
    let isOpen = false;
    //ALERTAS
    let visible = false;

    //Variables para paginacion
	let limit = 8;
	let offset = 0;
	let moreData = true;
	let currentPage=1; // No la utilizamos pero nos sirve para saber en que pagina estamos (quizas en un futuro)

    //Busquedas
	let searchCountry= "";
	let searchYear = "";
    
    let totaldata=0;
    let HIVData = [];
	let newHIVData = {
		country: "",
		year: "",
		living_with:"",
		newly_infected:"",
		total_infected:""
	}
    
    let errorMSG = "";
    let okayMSG = "";
    onMount(getHIVData);
 
    //GET
    async function getHIVData(){
	
    console.log("Fetching hiv data..");
    var url = "/api/v2/children-with-hiv?limit="+limit+"&offset="+(offset*limit);
    var urlAfter = "/api/v2/children-with-hiv?limit="+limit+"&offset="+(limit*(offset+1));
  
    if(searchCountry!="" &&searchCountry!=null){
        url = url+"&country="+searchCountry;
        urlAfter= urlAfter+"&country="+searchCountry;
    }
    
    if(searchYear!="" && searchYear!=null){
        url = url+"&year="+searchYear;
        urlAfter= urlAfter+"&year="+searchYear;
    }
    //Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda después de completar cada solicitud.
    const res = await fetch(url);
   
    //Tenemos que preguntar tambien si hay mas datos, ya que si no los hay,
    //al pasar de pagina estariamos haciendo una peticion a la api que nos devolveria un error
    const after =  await fetch(urlAfter);
    if(res.ok && after.ok){
        console.log("OK");
        const json = await res.json();
        const jsonAfter = await after.json();
        HIVData= json;
        //Comprobamos si hay mas datos o no despues para activar o desactivar el boton
        if(jsonAfter.length ==0){
            moreData=false;
        }
        else{
            moreData=true;
        }
        console.log("Received "+ HIVData.length +" resources." )
    }
    else{
        console.log("ERROR");
        errorMsg= "Fallo del servidor en la solicitud"
    }
        
    
}
    //LOAD INITIALDATA
	async function loadInitialData(){
	
    console.log("Fetching hiv data...");
    const res = await fetch("/api/v2/children-with-hiv/loadInitialData").then(function(res){
        if (res.ok){
            console.log("OK");
            getHIVData();
            totaldata=10;
            okayMSG= "Datos cargados con éxito."
        }
        else{
            errorMSG= "Error al cargar los datos"
            console.log("ERROR");
        }
    });
}
    //INSERT
    async function insertHIVData(){
		 
         console.log("Inserting hiv data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newHIVData.country == "" || newHIVData.country == null || newHIVData.year == "" || newHIVData.year == null){
             alert("Los campos 'País' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v2/children-with-hiv",{
             method:"POST",
             body:JSON.stringify(newHIVData),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     totaldata++;
                     getHIVData();
                     console.log("Data introduced");
                     okayMSG = "Recurso insertado con éxito";
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the database");
                     errorMSG= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
                 }
             });	
         }
     }

    //DELETE SPECIFIC
    async function deleteHIVData(country, year) {
        if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
        const res = await fetch("/api/v2/children-with-hiv/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getHIVData();      
            if (res.status==200) {
                totaldata--;
                okayMSG = "Recurso eliminado con éxito";
                console.log("Deleted " + country);            
            }
            else if (res.status==404) {
                errorMSG = "No se ha encontrado el objeto" + country;
                console.log("DATA NOT FOUND");            
            } 
            else {
                errorMSG= res.status + ": " + res.statusText;
                console.log("ERROR!");
            }      
         });
        }
    }   
    //DELETE ALL
    async function deleteALL() {
		console.log("Deleting hiv data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all hiv data...");
			const res = await fetch("/api/v2/children-with-hiv/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    HIVData = [];
					getHIVData();
                    okayMSG = "Entradas eliminadas con éxito"
					console.log("OK All data erased");
                    //location.reload();
				}
				else{
					console.log("ERROR Data was not erased");
					errorMSG= "La base de datos ya esta vacía";
				}
			});
		}
	}
    //SEARCH
    /*
    
    */
    //getNextPage
    async function getNextPage() {
 
        console.log(totaldata);
        if (offset+10 > totaldata) {
            offset = 0
            currentpage = 1;
        } else {
            offset +=10
            currentPage=2;
        }
        console.log("Charging page "+ offset);
        const res = await fetch("/api/v2/children-with-hiv?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            console.log("Received " + HIVData.length + " data.");
        } else {
            console.log("ERROR!");
        }
    }
    //getPreviewPage
    async function getPreviewPage() {
 
        if (offset-10>=1) {
            offset-=10; 
            currentPage-=1;
        } else {
            offset = 0
            currentPage = 1;
        }
        console.log("Charging page " +offset);
        const res = await fetch("/api/v2/children-with-hiv?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            console.log("Received " + HIVData.length + " resources.");
        } else {
            console.log("ERROR!");
        }
    }
</script>

<main>
    <h1 style="text-align: center;">Administrador de datos de <strong>Niños/as con VIH</strong></h1>

    {#await HIVData}
        Loading hiv data...
    {:then HIVData}

        {#if errorMSG}
            <UncontrolledAlert color="danger" >{errorMSG}</UncontrolledAlert>
	    {/if}

        {#if okayMSG}
            <UncontrolledAlert color = "success">{okayMSG}</UncontrolledAlert>
        {/if}

        <!-- Table -->
        <Table bordered responsive hover>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Viviendo con VIH</th>
                    <th>Nuevos infectados</th>
                    <th>Total de infectados</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" placeholder="Perú" bind:value="{newHIVData.country}"></td>
                    <td><input type="number" placeholder="2020" min=1960 bind:value="{newHIVData.year}"></td>
                    <td><input type="number" placeholder="100" min=0 bind:value="{newHIVData.living_with}"></td> 
                    <td><input type="number" placeholder="100" min=0 bind:value="{newHIVData.newly_infected}"></td>    
                    <td><input type="number" placeholder="200" min=0 bind:value="{newHIVData.total_infected}"></td>  
                    <td><Button outline color="primary" on:click={insertHIVData}>Insertar</Button></td>           
                </tr>
 
                {#each HIVData as sc}
                    <tr>
                        <td><a href="#/children-with-hiv/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.living_with}</td>
                        <td>{sc.newly_infected}</td>
                        <td>{sc.total_infected}</td>
                        <td><Button outline color="danger" on:click="{deleteHIVData(sc.country, sc.year)}">Borrar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>

        {#if HIVData.length === 0}
            <p>No se han encontrado datos, por favor, carga los datos iniciales.</p>
        {/if}

        <Button outline color="info" on:click="{getPreviewPage}">Atrás</Button>
            <Button>{currentPage}</Button>
        <Button outline color="info" on:click="{getNextPage}">Siguiente</Button>

        <p></p>
        <Button color="success" on:click="{loadInitialData}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar todo
        </Button>
        
    {/await}
</main>