<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
	
    
    let isOpen = false;
    let busquedas = "/api/v1/children-out-school?";
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
            //errorMSG= res.status + ": " + res.statusText;
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
                     getSchoolData();
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
    async function deleteSchoolData(name, year) {
        const res = await fetch("/api/v1/children-out-school/" + name + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getSchoolData();      
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
		console.log("Deleting school data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all school data...");
			const res = await fetch("/api/v1/children-out-school/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    totaldata = 0;
					getSchoolData();
                    //color = "success";
					//errorMSG="Datos eliminados correctamente";
                    errorMSG = 200.3;
					console.log("OK All data erased");
				}
				else{
					console.log("ERROR Data was not erased");
                    //color = "danger";
					//errorMSG= "No se han podido eliminar los datos";
                    errorMSG = res.status;
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
    <h1>Children Out School</h1>

    {#await schoolData}
        Loading school data...
    {:then schoolData}
    
        {#if errorMSG === 200.1}
        <UncontrolledAlert  color="success" >
            Datos cargados con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.2}
        <UncontrolledAlert  color="success" >
            Recurso eliminado con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.3}
        <UncontrolledAlert  color="success" >
            Datos cargados con éxito.
        </UncontrolledAlert>
	    {/if}
    
        {#if errorMSG === 404}
        <UncontrolledAlert  color="danger" >
            Recurso no encontrado.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 404}
        <UncontrolledAlert  color="danger" >
            Recurso no encontrado.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 409}
        <UncontrolledAlert  color="danger" >
            Conflicto detectado.
        </UncontrolledAlert>
	    {/if}

        <!-- Table -->
    {#if schoolData.length === 0}
        <p>No se han encontrado datos, por favor carga los datos iniciales.</p>
    {/if}

        <Table bordered responsive>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Abandono Escolar (Niños)</th>
                    <th>Abandono Escolar (Niñas)</th>
                    <th>Abandono Escolar (Total)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{newSchoolData.country}"></td>
                    <td><input bind:value="{newSchoolData.year}"></td>
                    <td><input bind:value="{newSchoolData.children_out_school_male}"></td> 
                    <td><input bind:value="{newSchoolData.children_out_school_female}"></td>    
                    <td><input bind:value="{newSchoolData.children_out_school_total}"></td>  
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