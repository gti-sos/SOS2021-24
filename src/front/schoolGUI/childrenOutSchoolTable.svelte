<script>
    import {Modal,ModalBody,ModalFooter,ModalHeader,Button,Table,Alert} from "sveltestrap";
    
    const BASE_API_URL = "/api/v2/children-out-school"; //tiene que llamar a la API para tratar los datos
     
    let cargados = false;
    let schoolData = [];
 
    let isOpen = false;
 
    let limit =10;
    let offset =0;
    let pagina = (offset/10)+1;
    let num_paginas=0;
    let flags ="";
    let filtros_act= false;
 
    getSchoolData();
 
    let newSchoolData = {
        country:"",
        year:"",
        children_out_school_male: "" ,
        children_out_school_female:"",
        children_out_school_total:""
    }
    let schoolDatabusqueda = {
        country:"",
        year:"",
        children_out_school_male: "" ,
        children_out_school_female:"",
        children_out_school_total:""
    }
         
    async function getNumPaginas() {
        console.log("Fetching school data...");
        const res = await fetch(BASE_API_URL);
        let datos=[]
        if(res.ok){
            const json = await res.json();
            datos = json;
            num_paginas=(datos.length/10)+1|0;
            if(datos.length%10==0&&num_paginas!==1){
                num_paginas--;
            }
        }
        else{
            console.log("ERROR!");
        }
    }
 
    async function getSchoolData() {
        getNumPaginas()
        console.log(num_paginas)
        console.log("Fetching school data...");
        const res = await fetch(BASE_API_URL+"?limit="+limit+"&offset="+offset+flags);
        if(res.status==200){
            const json = await res.json();
            schoolData = json;
            console.log(`Received ${schoolData.length} resources`);
            pagina = (offset/10)+1
            let mes="Se han encontrado "+ schoolData.length +" elementos que coinciden con la búsqueda";
            if(filtros_act) lanzamensaje(res.status,res.statusText,"Resultados",mes,null)
        }
        else{
            console.log("ERROR!");
        }
    }
 
    async function insertSchoolData() {
             console.log("Inserting new resource " + JSON.stringify(newSchoolData));
             newSchoolData.country=newSchoolData.country.replace(" ","_")
             const res = await fetch(BASE_API_URL, {
                 method: "POST",
                 body: JSON.stringify(newSchoolData),
                 headers: {
                     "Content-Type": "application/json",
                 }
             }
             ).then( (res) => {
                 getSchoolData();
                 switch (res.status){
                     case 409:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error:","Ya existe un dato con el mismo 'País' y 'Año' ",true)
                     break
 
                     case 400:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error:","Los datos de la entrada no fueron introducidos correctamente",true)
                     break
 
                     case 201:
                    let mensajeaux= "El dato "+newSchoolData.country+" / "+newSchoolData.year+" fue insertado con éxito." 
                     lanzamensaje(res.status,res.statusText,"Recurso insertado con éxito",mensajeaux,null)
                     break
 
                     default:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error:","",true)
                     break
                 }
             })  
         }
 
        async function deleteSchoolData( a, b) { //elimina un recurso en concreto
             console.log("Deleting resource " + JSON.stringify(schoolData));
             const res = await fetch(BASE_API_URL+"/"+a+"/"+b, {
                 method: "DELETE",   
             })
             switch(res.status){
             case 200:
             let mensajeaux= "Recurso "+a+" / "+b+" eliminado con éxito" 
                     lanzamensaje(res.status,res.statusText,"Recurso eliminado",mensajeaux,null)
                     if(schoolData.length==1&&num_paginas>1){
                         offset-=10; getSchoolData()
                      }else{
                         getSchoolData();
                     }
             break;
             case 404:
             let mensajeaux2= "Recuso "+a+"/"+b+" no encontrado"    
             lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento",mensajeaux2,true)
 
             break;
             default:
             lanzamensaje(res.status,res.statusText,"Se ha producido un error","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas tarde",true)
             break;
         }
        }
 
         async function loadStats(){
         console.log("Loading school Data...");
         const carga =  await fetch(BASE_API_URL + "/loadInitialData");
         cargados = true;
         filtros_act = false;
         if (carga.ok){
             console.log("Ok.");
             const res = await fetch(BASE_API_URL);
             if(res.ok){
                 console.log("Ok. Obtaining school Data...")
                 const json = await res.json();
                 schoolData = json;
                 getSchoolData()
                 console.log('School data received.');
                 lanzamensaje(res.status,res.statusText,"Datos cargados con éxito","Se han cargado con éxito (" + schoolData.length+ ") elementos.",null)
             }else{
                 lanzamensaje(res.status,res.statusText,"Error al cargar los datos","",true) 
                 console.log("Error, there is no data.")
             }
         }else{
             lanzamensaje(carga.status,carga.statusText,"Error cargar los datos","",true)
             console.log("Error loading data.");
         }
     }
    
     async function deleteStats() {
         console.log("Deleting life stats...");
         cargados=false;
         filtros_act = false;
         const res = await fetch(BASE_API_URL, {
             method: "DELETE"
         }).then(function (res) {
             if (res.status==200){
                 console.log("Ok.");
                 schoolData = [];
                 lanzamensaje(res.status,res.statusText,"Recursos eliminados","Recursos eliminados con éxito" ,null)
             } else if (res.status==404){ 
                 console.log("No Data found");
                 lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos","La base de datos ya esta vacía" ,true)
             } else  { 
                 console.log("Error deleting DB stats");
                 lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos","" ,true)
             }  
         });
     }
     
    function gotoupdate(country,year) {
        location.href = '#/children-out-school/'+ country +'/'+ year;
    }

 //Paginacion
 const siguiente= () => {offset+=10; getSchoolData()}
 const anterior= () => {offset-=10; getSchoolData()}
 
 //Busqueda especifica
 
     let popbusqueda = false;
     const cancelarbusqueda = () => (popbusqueda = !popbusqueda);
     const buscar = () => {
         popbusqueda = !popbusqueda
        
         if(schoolDatabusqueda.country.replace(" ","").length!=0){
             flags= flags+"&country="+schoolDatabusqueda.country;
         }
         else if(schoolDatabusqueda.year.replace(" ","").length!=0){
             flags= flags+"&year="+parseInt(schoolDatabusqueda.year);
         }
         else if(schoolDatabusqueda.children_out_school_male.replace(" ","").length!=0){
             flags= flags+"&children_out_school_male="+parseInt(schoolDatabusqueda.children_out_school_male);
         }
         else if(schoolDatabusqueda.children_out_school_female.replace(" ","").length!=0){
             flags= flags+"&children_out_school_female="+parseInt(schoolDatabusqueda.children_out_school_female);
         }
         else if(schoolDatabusqueda.children_out_school_total.replace(" ","").length!=0){
             flags= flags+"&children_out_school_total="+parseInt(schoolDatabusqueda.children_out_school_total);
         }
         
         filtros_act=true
         getSchoolData()
     }
 
    const quitafiltros =() => {
        flags="";
        filtros_act=false;
        getSchoolData();
    }
 
 //Modal alerta
 let rescodigo=0;
 let mensaje= "";
 let resstatus="";
 let mensajeespecifico="";
 let error=false;
 
 let alerta=false;
 const lanzamensaje=(rc,rs,m,me,err)=>{
     rescodigo=rc;
     resstatus=rs;
     mensaje=m;
     mensajeespecifico=me;
     error=err;//booleano
     alerta=true;
 }
 const togglealerta=()=>{
     alerta=!alerta;
 }
 
 </script>
   
 <main>
    <h1 style="text-align: center;">Administrador de datos de <strong>Abandono Escolar</strong></h1>
     <div>
        <!-- Modal para la busqueda -->
        <Modal isOpen={popbusqueda} toggle={cancelarbusqueda} transitionOptions>
            <ModalHeader {cancelarbusqueda}>Búsqueda por parámetros</ModalHeader>
                <ModalBody >
                    <Table >
                        <tbody>
                            <tr>
                                <th>País</th>
                                <td><input placeholder ="Spain" bind:value="{schoolDatabusqueda.country}"></td> 
                            </tr>
                            <tr>
                                <th>Año</th>
                                <td><input placeholder ="2018" bind:value="{schoolDatabusqueda.year}"></td>
                            </tr>
                            <tr>
                                <th>Abandono Escolar (Niños)</th>
                                 <td><input placeholder="0" bind:value="{schoolDatabusqueda.children_out_school_male}"></td>   
                            </tr>
                            <tr>
                                <th>Abandono Escolar (Niñas)</th>
                                <td><input placeholder="0" bind:value="{schoolDatabusqueda.children_out_school_female}"></td>
                            </tr>
                            <tr>
                                <th>Abandono Escolar (Total)</th>
                                <td><input placeholder ="0" bind:value="{schoolDatabusqueda.children_out_school_total}"></td>
                            </tr>   
                        </tbody>
                    </Table >
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" on:click={buscar}>Buscar</Button>
                    <Button color="secondary" on:click={cancelarbusqueda}>Cancelar</Button>
                </ModalFooter>
        </Modal>
 
             <Modal isOpen={alerta} toggle={togglealerta} transitionOptions>
                 <ModalHeader toggle={togglealerta} style="text-align: center;">{mensaje}
                 </ModalHeader>
                 <ModalBody style="text-align: center;">
                     {#if error!=null}
                         {#if error}
                         ERROR
                         <Alert color="danger" ><p> {rescodigo} {resstatus}</p>{mensajeespecifico}</Alert>
                         {/if}
                     {:else}
                     <Alert color="success" >{mensajeespecifico}</Alert>
                     {/if}
                        <Button color="secondary" on:click={togglealerta}>Volver</Button>
                 </ModalBody>
                 
             </Modal>
         </div>

     {#if !filtros_act} 
        <Button color="info" on:click={cancelarbusqueda}> Buscar </Button>
        {:else}
        <Button color="warning" on:click={quitafiltros}> Quitar filtros </Button> 
        <Alert color="warning">Desactive los filtros para realizar otra búsqueda</Alert>
    {/if}
     
         <br/>
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
             <tr>
                <td><input type="text" placeholder="China" bind:value="{newSchoolData.country}"></td>
                <td><input type="number" placeholder="2019" min=1960 bind:value="{newSchoolData.year}"></td>
                <td><input type="number" placeholder="0" min=0 bind:value="{newSchoolData.children_out_school_male}"></td> 
                <td><input type="number" placeholder="0" min=0 bind:value="{newSchoolData.children_out_school_female}"></td>    
                <td><input type="number" placeholder="0" min=0 bind:value="{newSchoolData.children_out_school_total}"></td>  
                <td><Button outline color="primary" on:click={insertSchoolData}>Insertar</Button></td>           
            </tr>
         </thead>
         <tbody>
             {#each schoolData as sc}
                 <tr>
                     <td><a href="#/children-out-school/{sc.country}/{sc.year}">{sc.country}</a></td>
                     <td>{sc.year}</td>
                     <td>{sc.children_out_school_male}</td>
                     <td>{sc.children_out_school_female}</td>
                     <td>{sc.children_out_school_total}</td>
                     <td>
                         <Button outline color="danger" on:click={() =>deleteSchoolData(sc.country,sc.year)}> Borrar </Button>
                         <Button outline color="success" on:click={() =>gotoupdate(sc.country,sc.year) }> Actualizar</Button>
                     </td>
                 </tr>
             {/each}
         </tbody>
     </Table >
     

     {#if schoolData.length === 0}
        <Alert color="warning">No se han encontrado datos, por favor, carga los datos inciales.</Alert>
    {/if}

        <p></p>
        <Button color="success" on:click="{loadStats}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteStats}">
            Eliminar todo
        </Button>
        <Button color="dark" href="#/analytics/children-out-school">Ver analítica</Button>

        {#if schoolData.length !== 0}
        <div style="text-align: center; " >
            {#if pagina != 1}
            <Button outline color="info" on:click={anterior}>Anterior</Button>
            {/if}
            <Button color="dark" >Pag. Nº: {pagina} / {num_paginas}</Button>    
            {#if num_paginas-pagina!=0 }
             <Button outline color="info" on:click={siguiente}>Siguiente</Button>
             {/if}
        </div>
        {/if}
 </main>
 