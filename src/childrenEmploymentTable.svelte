<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	import { pop } from "svelte-spa-router";
import { get } from "svelte/store";
	
    
    let isOpen = false;
    let busquedas = "/api/v1/children-employment?";
    //ALERTAS
    let visible = false;
    let color = "danger";
    
    let page = 1;
    let totaldata=5;
    let employmentData = [];
	let newEmploymentData = {
		country: "",
		year: "",
		percent_children_employment_m:"",
		percent_children_employment_f:"",
		percent_children_employment_t:""
	}
    
    let errorMSG = "";
    let okayMSG = "";
    onMount(getEmploymentData);
 
    //GET
    async function getEmploymentData() {
 
        console.log("Fetching employment Data...");
        const res = await fetch("/api/v1/children-employment?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + employmentData.length + " Employment Data.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching employment data...");
        await fetch("/api/v1/children-employment/loadInitialData");
        const res = await fetch("/api/v1/children-employment?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            employmentData = json;
            totaldata=5;
            console.log("Received " + employmentData.length + " Employment data.");
            color = "success";
            errorMSG = "Datos cargados correctamente";
        } 
        else {
            color = "danger";
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    
    async function insertEmploymentData(){
		 
         console.log("Inserting employment data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newEmploymentData.country == "" || newEmploymentData.country == null || newEmploymentData.year == "" || newEmploymentData.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/children-employment",{
             method:"POST",
             body:JSON.stringify(newEmploymentData),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     getEmploymentData();
                     console.log("Data introduced");
                     color = "success";
                     errorMSG="Entrada introducida correctamente a la base de datos";
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     color = "danger";
                     errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the da tabase");
                     color = "danger";
                     errorMSG= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
                 }
             });	
         }
     }

    //DELETE SPECIFIC
    async function deleteEmploymentData(name, year) {
        const res = await fetch("/api/v1/children-employment/" + name + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getEmploymentData();      
            if (res.status==200) {
                totaldata--;
                color = "success";
                errorMSG = "Recurso" + country + year + "borrado correctamente";
                console.log("Deleted " + name);            
            }else if (res.status==404) {
                color = "danger";
                errorMSG = "No se ha encontrado el objeto" + name;
                console.log("SUICIDE NOT FOUND");            
            } else {
                color = "danger";
                errorMSG= res.status + ": " + res.statusText;
                console.log("ERROR!");
            }      
        });
    }
    //DELETE ALL
    async function deleteALL() {
		console.log("Deleting employment data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all employment data...");
			const res = await fetch("/api/v1/children-employment/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    totaldata = 0;
					getEmploymentData();
                    color = "success";
					errorMSG="Datos eliminados correctamente";
					console.log("OK All data erased");
				}
				else{
					console.log("ERROR Data was not erased");
                    color = "danger";
					errorMSG= "No se han podido eliminar los datos";
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
        const res = await fetch("/api/v1/children-employment?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            employmentData = json;
            console.log("Received " + employmentData.length + " data.");
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
        const res = await fetch("/api/v1/children-employment?limit=5&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            employmentData = json;
            console.log("Received " + employmentData.length + " resources.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
</script>

<main>
    <h1>Administrador de datos de niñ@s empleados</h1>

    {#await employmentData}
        Loading employment data...
    {:then employmentData}
    
    <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
        {#if errorMSG}
		    {errorMSG}
	    {/if}
    </Alert>

        <Table bordered responsive>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Niños con empleo </th>
                    <th>Niñas con empleo </th>
                    <th>Total de niñ@s con empleo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{newEmploymentData.country}"></td>
                    <td><input bind:value="{newEmploymentData.year}"></td>
                    <td><input bind:value="{newEmploymentData.percent_children_employment_m}"></td> 
                    <td><input bind:value="{newEmploymentData.percent_children_employment_f}"></td>    
                    <td><input bind:value="{newEmploymentData.percent_children_employment_t}"></td>  
                    <td><Button outline color="primary" on:click={insertEmploymentData}>Insertar</Button></td>           
                </tr>
 
                {#each employmentData as sc}
                    <tr>
                        <td><a href="#/children-employment/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.percent_children_employment_m}</td>
                        <td>{sc.percent_children_employment_f}</td>
                        <td>{sc.percent_children_employment_t}</td>
                        <td><Button outline color="danger" on:click="{deleteEmploymentData(sc.country, sc.year)}">Borrar</Button></td>
                        
                    </tr>
                {/each}
            </tbody>
        </Table>
          <Button color="success" on:click="{loadInitialData}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar todo
        </Button>
        <Button outline color="primary" on:click="{getPreviewPage}">
           Atrás
        </Button>
        <Button outline color="primary" on:click="{getNextPage}">
            Siguiente
         </Button>
         
    {/await}
</main>