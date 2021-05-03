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
    let schoolData = [];
	let newSchoolData = {
		country: "",
		year: "",
		children_out_school_male:"",
		children_out_school_female:"",
		children_out_school_total:""
	}
    
    let errorMSG = "";
    let okayMSG = "";
    onMount(getSchoolData);
 
    //GET
    async function getSchoolData(){
	
    console.log("Fetching school data..");
    var url = "/api/v2/children-out-school?limit="+limit+"&offset="+(offset*limit);
    var urlAfter = "/api/v2/children-out-school?limit="+limit+"&offset="+(limit*(offset+1));
  
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
        schoolData= json;
        //Comprobamos si hay mas datos o no despues para activar o desactivar el boton
        if(jsonAfter.length ==0){
            moreData=false;
        }
        else{
            moreData=true;
        }
        console.log("Received "+ schoolData.length +" resources." )
    }
    else{
        console.log("ERROR");
        errorMsg= "Fallo del servidor en la solicitud"
    }
        
    
}
    //LOAD INITIALDATA
	async function loadInitialData(){
	
    console.log("Fetching school data...");
    const res = await fetch("/api/v2/children-out-school/loadInitialData").then(function(res){
        if (res.ok){
            console.log("OK");
            getSchoolData();
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
    async function insertSchoolData(){
		 
         console.log("Inserting school data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (newSchoolData.country == "" || newSchoolData.country == null || newSchoolData.year == "" || newSchoolData.year == null){
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v2/children-out-school",{
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
    async function deleteSchoolData(country, year) {
        if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
        const res = await fetch("/api/v2/children-out-school/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true; 
            getSchoolData();  
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
		console.log("Deleting school data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all school data...");
			const res = await fetch("/api/v2/children-out-school/", {
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
        if (offset+10 > totaldata) {
            offset = 0
            currentpage = 1;
        } else {
            offset +=10
            currentPage=2;
        }
        console.log("Charging page "+ offset);
        const res = await fetch("/api/v2/children-out-school?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " data.");
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
        const res = await fetch("/api/v2/children-out-school?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " resources.");
        } else {
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