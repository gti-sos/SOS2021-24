<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	import { pop } from "svelte-spa-router";
	
    
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
    
    let errorMSG = "";
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
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    async function insertSchoolData() {
 
        console.log("Inserting school data..." + JSON.stringify(newSchoolData));
        const res = await fetch("/api/v1/children-out-school", {
            method: "POST",
            body: JSON.stringify(newSchoolData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            
            visible = true;
            if (res.status==200) {
                totaldata++;
                color = "success";
                errorMSG = newSchoolData.country +" creado correctamente";
                console.log("Inserted "+newSchoolData.country +" school data.");            
            }else if (res.status== 400) {
                color = "danger";
                errorMSG = "Formato incorrecto, compruebe que País y Año estén rellenos.";
                console.log("BAD REQUEST");            
            }else if (res.status==409) {
                color = "danger";
                errorMSG = newSchoolData.country +" " +newSchoolData.year +"  ya existe, recuerde que Año y País son exclusivos.";
                console.log("This data already exits");            
            } else {
                color = "danger";
                errorMSG= "Formato incorrecto, compruebe que País y Añó estén rellenos.";
                console.log("BAD REQUEST");
            }
        });
         
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
                color = "success";
                errorMSG = name + " " + year + " borrado correctamente";
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
        const res = await fetch("/api/v1/children-out-school/", {
            method: "DELETE"
        }).then(function (res) {
            getSchoolData();
            visible = true;
            if (res.status==200) {
                totaldata=0;
                color = "success";
                errorMSG = "Objetos borrados correctamente";
                console.log("Deleted all data.");            
            }else if (res.status==400) {
                color = "danger";
                errorMSG = "Ha ocurrido un fallo";
                console.log("BAD REQUEST");            
            } else {
                color = "danger";
                errorMSG= res.status + ": " + res.statusText;
                console.log("ERROR!");
            }
        });
    }
    //SEARCH
    async function searchSchoolData() {
 
        console.log("Searching data...");
        if (searchSchoolData.country!=null) {
            busquedas+="country="+searchSchoolData.country +"&";
       }if (searchSchoolData.year!=null) {
            busquedas+="year="+searchSchoolData.year +"&";
        }
        if (searchSchoolData.children_out_school_male!=null) {
            busquedas+="children-out-school-male="+searchSchoolData.children_out_school_male +"&";
        }
        if (searchSchoolData.children_out_school_female!=null) {
            busquedas+="children-out-school-female="+searchSchoolData.children_out_school_female +"&";
        }
        if (searchSchoolData.children_out_school_total!=null) {
            busquedas+="children-out-school-total="+searchSchoolData.children_out_school_total +"&";
        }
        
        const res = await fetch(busquedas);
        busquedas="/api/v1/children-out-school?";
        searchSchoolData = {
            country: null,
            year: null,
            children_out_school_male: null,
            children_out_school_female: null,
            children_out_school_total: null
        };
        if (res.ok) {
            visible = false;
            console.log("Ok:");
            const json = await res.json();
            schoolData = json;
            console.log("Received " + schoolData.length + " resources.");
        } else {
            visible = true;
            color = "danger";
            errorMSG = "No se ha encontrado ningún objeto";
            console.log("Data not found!");
        }
    }
    //getNextPage
    async function getNextPage() {
 
        console.log(totaldata);
        if (page+5 > totaldata) {
            page = 1
        } else {
            page+=5
        }
        console.log("Charging page " +page);
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

      <Button color="primary" on:click={() => (isOpen = !isOpen)} class="mb-3">
        Buscar
      </Button>
      
      <Collapse {isOpen}>
        <Table bordered responsive>
            <tbody>
                <tr>
                    <td> <Button outline  color="primary" on:click={searchSchoolData}>Buscar</Button> </td>
                    <td><input placeholder="País" bind:value="{searchSchoolData.country}"></td>
                    <td><input placeholder="Año" bind:value="{searchSchoolData.year}"></td>
                    <td><input placeholder="Abandono Escolar (Niños)" bind:value="{searchSchoolData.children_out_school_male}"></td>
                    <td><input placeholder="Abandono Escolar (Niñas)" bind:value="{searchSchoolData.children_out_school_female}"></td>
                    <td><input placeholder="Abandono Escolar (Total)" bind:value="{searchSchoolData.children_out_school_total}"></td>
                </tr>
            </tbody>
        </Table>
      </Collapse>

      {#await schoolData}
        Loading school data...
    {:then schoolData}
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