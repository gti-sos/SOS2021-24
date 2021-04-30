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
    let color = "danger";
    
    let page = 1;
    let totaldata=8;
    let schoolData = [];
	let newSchoolData = {
		country: "",
		year: "",
		children_out_school_male:"",
		children_out_school_female:"",
		children_out_school_total:""
	}
    
    let errorMSG = null;
    let okayMSG = "";
    onMount(getSchoolData);
 
    //GET
    async function getSchoolData() {
 
        console.log("Fetching school Data...");
        const res = await fetch("/api/v1/children-out-school?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " School Data.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching school data...");
        await fetch("/api/v1/children-out-school/loadInitialData");
        const res = await fetch("/api/v1/children-out-school?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            totaldata=8;
            console.log("Received " + schoolData.length + " school data.");
            okayMSG = "Datos cargados con éxito";
        } 
        else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    
    async function insertSchoolData(){
		 
         console.log("Inserting school data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newSchoolData.country == "" || newSchoolData.country == null || newSchoolData.year == "" || newSchoolData.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/children-out-school",{
             method:"POST",
             body:JSON.stringify(newSchoolData),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     totaldata++;
                     getSchoolData();
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
    async function deleteSchoolData(name, year) {
        if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
        const res = await fetch("/api/v1/children-out-school/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getSchoolData();      
            if (res.status==200) {
                totaldata--;
                okayMSG = "Recurso eliminado con éxito";
                console.log("Deleted " + country);            
            }else if (res.status==404) {
                errorMSG = "No se ha encontrado el objeto" + country;
                console.log("DATA NOT FOUND");            
            } else {
                errorMSG= res.status + ": " + res.statusText;
                console.log("ERROR!");
            }      
         });
        }
    }   
    //DELETE ALL
    async function deleteALL() {
		console.log("Deleting school data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all school data...");
			const res = await fetch("/api/v1/children-out-school/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    schoolData = [];
					getSchoolData();
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
        if (page+5 > totaldata) {
            page = 1
        } else {
            page+=5
        }
        console.log("Charging page "+ page);
        const res = await fetch("/api/v1/children-out-school?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " data.");
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
        const res = await fetch("/api/v1/children-out-school?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " resources.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
</script>

<main>
    <h1 style="text-align: center;">Administrador de datos de <strong>Abandono escolar</strong></h1>

    {#await schoolData}
        Loading school data...
    {:then schoolData}

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
                    <th>Abandono Escolar (Niños)</th>
                    <th>Abandono Escolar (Niñas)</th>
                    <th>Abandono Escolar (Total)</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" placeholder="China" bind:value="{newSchoolData.country}"></td>
                    <td><input type="number" placeholder="2019" min=1960 bind:value="{newSchoolData.year}"></td>
                    <td><input type="number" placeholder="10" min=0 bind:value="{newSchoolData.children_out_school_male}"></td> 
                    <td><input type="number" placeholder="10" min=0 bind:value="{newSchoolData.children_out_school_female}"></td>    
                    <td><input type="number" placeholder="20" min=0 bind:value="{newSchoolData.children_out_school_total}"></td>  
                    <td><Button outline color="primary" on:click={insertSchoolData}>Insertar</Button></td>           
                </tr>
 
                {#each schoolData as sc}
                    <tr>
                        <td><a href="#/children-out-school/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.children_out_school_male}</td>
                        <td>{sc.children_out_school_female}</td>
                        <td>{sc.children_out_school_total}</td>
                        <td><Button outline color="danger" on:click="{deleteSchoolData(sc.country, sc.year)}">Borrar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>

        {#if schoolData.length === 0}
            <p style="color: orange">No se han encontrado datos, por favor, carga los datos iniciales.</p>
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