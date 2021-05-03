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
	let limit = 10;
	let offset = 0;
	let moreData = true;
	let currentPage=1; // No la utilizamos pero nos sirve para saber en que pagina estamos (quizas en un futuro)

    //Busquedas
	let searchCountry= "";
	let searchYear = "";
    
    let totaldata=0;
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
    async function getEmploymentData(){
	
    console.log("Fetching employment data..");
    var url = "/api/v2/children-employment?limit="+limit+"&offset="+(offset*limit);
    var urlAfter = "/api/v2/children-employment?limit="+limit+"&offset="+(limit*(offset+1));
  
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
        employmentData= json;
        //Comprobamos si hay mas datos o no despues para activar o desactivar el boton
        if(jsonAfter.length ==0){
            moreData=false;
        }
        else{
            moreData=true;
        }
        console.log("Received "+ employmentData.length +" resources." )
    }
    else{
        console.log("ERROR");
        errorMsg= "Fallo del servidor en la solicitud"
    }
        
    
}
    //LOAD INITIALDATA
	async function loadInitialData(){
	
    console.log("Fetching employment data...");
    const res = await fetch("/api/v2/children-employment/loadInitialData").then(function(res){
        if (res.ok){
            console.log("OK");
            getEmploymentData();
            totaldata=21;
            okayMSG= "Datos cargados con éxito."
        }
        else{
            errorMSG= "Error al cargar los datos"
            console.log("ERROR");
        }
    });
}
    //INSERT
    async function insertEmploymentData(){
		 
         console.log("Inserting employment data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newEmploymentData.country == "" || newEmploymentData.country == null || newEmploymentData.year == "" || newEmploymentData.year == null){
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v2/children-employment",{
             method:"POST",
             body:JSON.stringify(newEmploymentData),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     totaldata++;
                     getEmploymentData();
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
    async function deleteEmploymentData(country, year) {
        if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
        const res = await fetch("/api/v2/children-employment/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getEmploymentData();      
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
		console.log("Deleting employment data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all employment data...");
			const res = await fetch("/api/v2/children-employment/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    empoymentData = [];
					getEmploymentData();
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
        const res = await fetch("/api/v2/children-employment?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            employmentData = json;
            console.log("Received " + employmentData.length + " data.");
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
        const res = await fetch("/api/v2/children-employment?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            employmentData = json;
            console.log("Received " + employmentData.length + " resources.");
        } else {
            console.log("ERROR!");
        }
    }
</script>

<main>
    <h1 style="text-align: center;">Administrador de datos de <strong>Niñ@s empleados</strong></h1>

    {#await employmentData}
        Loading employment data...
    {:then employmentData}

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
                    <th>Niños empleados</th>
                    <th>Niñas empleadas</th>
                    <th>Total de niñ@s empleados</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" placeholder="acerbaijan" bind:value="{newEmploymentData.country}"></td>
                    <td><input type="number" placeholder="2005" min=1960 bind:value="{newEmploymentData.year}"></td>
                    <td><input type="number" placeholder="6" min=0 bind:value="{newEmploymentData.percent_children_employment_m}"></td> 
                    <td><input type="number" placeholder="4.4" min=0 bind:value="{newEmploymentData.percent_children_employment_f}"></td>    
                    <td><input type="number" placeholder="5.2" min=0 bind:value="{newEmploymentData.percent_children_employment_t}"></td>  
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

        {#if employmentData.length === 0}
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