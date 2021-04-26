<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
	
    
    let isOpen = false;
    let busquedas = "/api/v1/children-with-hiv?";
    //ALERTAS
    let visible = false;
    let color = "danger";
    
    let page = 1;
    let totaldata=5;
    let HIVData = [];
	let newHIVData = {
		country: "",
		year: "",
		living_with:"",
		newly_infected:"",
		total_infected:""
	}
    
    let errorMSG = null;
    onMount(getHIVData);
 
    //GET
    async function getHIVData() {
 
        console.log("Fetching HIV Data...");
        const res = await fetch("/api/v1/children-with-hiv?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            console.log("Received " + HIVData.length + " HIV Data.");
        } else {
            errorMSG= res.status;// + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching HIV data...");
        await fetch("/api/v1/children-with-hiv/loadInitialData");
        const res = await fetch("/api/v1/children-with-hiv?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            totaldata=8;
            console.log("Received " + HIVData.length + " HIV data.");
            //color = "success";
            //errorMSG = "Datos cargados correctamente";
            errorMSG = 200.1;
        } 
        else {
            //color = "danger";
            //errorMSG= res.status + ": " + res.statusText;
            errorMSG = 404;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    
    async function insertHIVData(){
		 
         console.log("Inserting HIV data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newHIVData.country == "" || newHIVData.country == null || newHIVData.year == "" || newHIVData.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/children-with-hiv",{
             method:"POST",
             body:JSON.stringify(newHIVData),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     getHIVData();
                     console.log("Data introduced");
                     //color = "success";
                     //errorMSG="Entrada introducida correctamente a la base de datos";
                     errorMSG = 201;
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     //color = "danger";
                     //errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                     errorMSG = 400;
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the database");
                    //color = "danger";
                     //errorMSG= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
                     errorMSG = 409;
                 }
             });	
         }
     }

    //DELETE SPECIFIC
    async function deleteHIVData(name, year) {
        const res = await fetch("/api/v1/children-with-hiv/" + name + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getHIVData();      
            if (res.status==200) {
                totaldata--;
                //color = "success";
                //errorMSG = "Recurso" + country + year + "borrado correctamente";
                errorMSG = 200.2;
                console.log("Deleted " + name);            
            }else if (res.status==404) {
                //color = "danger";
                //errorMSG = "No se ha encontrado el objeto" + name;
                errorMSG = 404;
                console.log("DATA NOT FOUND");            
            } else {
                //color = "danger";
                errorMSG= res.status;// + ": " + res.statusText;
                console.log("ERROR!");
            }      
        });
    }
    //DELETE ALL
    async function deleteALL() {
		console.log("Deleting HIV data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all HIV data...");
			const res = await fetch("/api/v1/children-with-hiv/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    totaldata = 0;
					getHIVData();
                    //color = "success";
					//errorMSG="Datos eliminados correctamente";
                    errorMSG = 200.3;
					console.log("OK All data erased");
                    location.reload();
				}
				else{
					console.log("ERROR Data was not erased");
                    //color = "danger";
					//errorMSG= "No se han podido eliminar los datos";
                    errorMSG = 404.2;
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
        if (page+5 > totaldata) {
            page = 1
        } else {
            page+=5
        }
        console.log("Charging page "+ page);
        const res = await fetch("/api/v1/children-with-hiv?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            console.log("Received " + HIVData.length + " data.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    //getPreviewPage
    async function getPreviewPage() {
 
        if (page-5>=1) {
            page-=5; 
        } else page = 1
        console.log("Charging page " +page);
        const res = await fetch("/api/v1/children-with-hiv?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            HIVData = json;
            console.log("Received " + HIVData.length + " resources.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
</script>

<main>
    <h1 style="text-align: center;">Administrador de datos de VIH en niños/as</h1>

    {#await HIVData}
        Loading HIV data...
    {:then HIVData}
    
        {#if errorMSG === 200.1}
        <UncontrolledAlert  color="success" >
            Datos cargados con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.2}
        <UncontrolledAlert  color="warning" >
            Recurso eliminado con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.3}
        <UncontrolledAlert  color="warning" >
            Elementos borrados con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 201}
        <UncontrolledAlert  color="success" >
            Recurso instertado con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 404.2}
        <UncontrolledAlert  color="danger" >
            La base de datos ya esta vacía.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 409}
        <UncontrolledAlert  color="danger" >
            Este recurso (País y Año) ya existe.
        </UncontrolledAlert>
	    {/if}

        <!-- Table -->

        <Table bordered responsive hover>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Viviendo con VIH</th>
                    <th>Nuevos infectados de VIH</th>
                    <th>Suma total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{newHIVData.country}"></td>
                    <td><input bind:value="{newHIVData.year}"></td>
                    <td><input bind:value="{newHIVData.living_with}"></td> 
                    <td><input bind:value="{newHIVData.newly_infected}"></td>    
                    <td><input bind:value="{newHIVData.total_infected}"></td>  
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
            <p>No se han encontrado datos, por favor, carga los datos iniciales. </p>
        {/if}

        <Button color="success" on:click="{loadInitialData}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar todo
        </Button>
        <Button outline color="info" on:click="{getPreviewPage}">
           Atrás
        </Button>
        <Button outline color="info" on:click="{getNextPage}">
            Siguiente
         </Button>
         
    {/await}
</main>