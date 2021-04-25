<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert } from 'sveltestrap';
	import { pop } from "svelte-spa-router";
	
    let schoolData = [];
	let newSchoolData = {
		country: "",
		year: "",
		children_out_school_male:"",
		children_out_school_female:"",
		children_out_school_total:""
	}

	//Variables para paginacion
	let limit = 6;
	let offset = 0;
	let moreData = true;
	let currentPage=1; // No la utilizamos pero nos sirve para saber en que pagina estamos (quizas en un futuro)
	
	//Variables para busquedas
	let searchCountry= "";
	let searchYear = "";
	//Estas variables son para los errores
	let okayMsg = "";
	let errorMsg = "";
	
	async function loadSchoolData(){
	
		console.log("Fetching children out of school...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v1/children-out-school/loadInitialData").then(function(res){
			if (res.ok){
				console.log("OK");
				getSchoolData();
				okayMsg= "Datos cargados correctamente."
			}
			else if(res.status == 409){
				errorMsg = "Ya hay datos cargados. Esta accion eliminaria los datos existentes. Si quiere cargar los datos iniciales, elimine todos los disponibles primero."
				console.log("ERROR ALREADY LOADED DATA");
			}
			else{
				console.log("ERROR");
			}
		});
	}

	async function getSchoolData(){
	
		console.log("Fetching school data...");
		
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda solo después de completar cada solicitud.
		const res = await fetch("/api/v1/children-out-school?limit=5");
	
		if(res.ok ){
			console.log("OK");
			const json = await res.json();
			schoolData = json;
			console.log("Received "+ schoolData.length +" resurces" )
		}
		else{
			console.log("ERROR");
			errorMsg= "Fallo del servidor en la solicitud"
		}
	}
	
	async function insertSchoolData(){
		 
		console.log("Inserting school data...");
		//Comprobamos que el año y la fecha no estén vacíos, ***el string vacio no es null***
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
					okayMsg="Entrada introducida correctamente a la base de datos";
				}
				else if(res.status == 400){
					console.log("ERROR Data was not correctly introduced");
					errorMsg= "Los datos de la entrada no fueron introducidos correctamente";
				}
				else if(res.status == 409){
					console.log("ERROR There is already a data with that country and year in the da tabase");
					errorMsg= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
				}
			});	
		}
	}
	async function deleteSchoolData() {
		console.log("Deleting school data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all school data...");
			const res = await fetch("/api/v1/children-out-school/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
					getSchoolData();
					offset = 0;
					currentPage = 1;
					okayMsg="Datos eliminados correctamente";
					console.log("OK All data erased");
				}
				else{
					console.log("ERROR Data was not erased");
					errorMsg= "No se han podido eliminar los datos";
				}
			});
		}
	}
	async function deleteOneSchoolData(country,year) {
		console.log("Inserting school data...");
		if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
			console.log("Deleting school data...");
			const res = await fetch("/api/v1/children-out-school/" + country + "/"+year,{
				method:"DELETE"
			}).then(function (res) {
				if(res.ok){
					getSchoolData();
					okayMsg="Entrada eliminada correctamente";
					console.log("OK data erased");
				}
				else if(res.status=404){
					errorMsg="La entrada que intenta eliminar no se encuentra en la base de datos";
					console.log("ERROR Data not found in database");
				}
				else{
					errorMsg="No se ha podido eliminar la entrada";
					console.log("ERROR");
				}
			});	
		}
	}
	async function searchData(country,year){
		if(searchCountry!=""){
			url = url+"&country="+searchCountry;
			urlAfter= urlAfter+"&country="+searchCountry;
		}
		
		if(searchYear!=""){
			url = url+"&year="+searchYear;
			urlAfter= urlAfter+"&year="+searchYear;
		}
	}
	function changePage(increment){
		//La variable se llama increment pero podria ser un numero negativo y asi cambiariamos a una pagina menor
		offset += increment;
		currentPage += increment;
		getSc();
	}

    onMount(getSchoolData);
	</script>
	
<main>
	{#await schoolData}
		Loading school data...
	{:then schoolData}
	
	<Form class="form-inline" >
		<Label for="country" class="mb-2 mr-sm-2">Busqueda por Pais:</Label>
		<Input type="text" class="form-control mb-2 mr-sm-2" id="country" placeholder="Introduzca un país" name="country" bind:value="{searchCountry}"/>
		<Label for="year" class="mb-2 mr-sm-2">y Año:</Label>
		<Input type="number" class="form-control mb-2 mr-sm-2" id="year" placeholder="Introduzca un año" name="year" bind:value="{searchYear}"/>   
	</Form>
	<Button class="button-search" on:click="{getSchoolData}" >Buscar</Button>

	<Button outline color= "primary"  on:click="{loadSchoolData}">Cargar</Button>
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
		
	{/if}
	{#if okayMsg}
	<p style="color: green">OK: {okayMsg}</p>
	{/if}

		<Table bordered>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Abandono escolar (niños)</th>
					<th>Abandono escolar (niñas)</th>
					<th>Abandono escolar (Total)</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
					<tr>
						<td><Input type="text" placeholder="Sweden" bind:value="{newSchoolData.country}"/></td>
						<td><Input type="number" placeholder="2019" min=1960 bind:value="{newSchoolData.year}"/></td>
						<td><Input type="number" placeholder="20" min=0 bind:value="{newSchoolData.children_out_school_male}"/></td>
						<td><Input type="number" placeholder="10" min=0 bind:value="{newSchoolData.children_out_school_female}"/></td>
						<td><Input type="number" placeholder="30" min=0 bind:value="{newSchoolData.children_out_school_total}"/></td>
						<td><Button outline color= "primary"  on:click={insertSchoolData}>Insertar</Button></td>
					</tr>
				{#each schoolData as data}
					<tr>
						<td>
							<a href= "#/children-out-school/{data.country}/{data.year}">{data.country} </a>
						</td>
						<td>{data.year}</td>
						<td>{data.children_out_school_male}</td>
						<td>{data.children_out_school_female}</td>
						<td>{data.children_out_school_total}</td>
						<td><Button outline color="danger" on:click="{deleteOneSchoolData(data.country, data.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	<Pagination ariaLabel="Web pagination">
		<!-- Si estamos en la pagina 1, no podemos darle al boton que nos lleva una pagina atras, no tendria sentido que pudiesemos darle-->
		<PaginationItem class="{currentPage===1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/children-out-school" on:click="{() => changePage(-1)}" />
		</PaginationItem>
		{#if moreData}
		<PaginationItem>
		  	<PaginationLink next href="#/children-out-school" on:click="{() => changePage(1)}" />
		</PaginationItem>
		{/if}
	  </Pagination>

	<Button outline color="secondary" on:click="{pop}"> Atrás</Button>
	<Button block outline on:click={deleteSchoolData} color="danger">  Eliminar todo </Button>
</main>