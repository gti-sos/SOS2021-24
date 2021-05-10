<script lang="ts">
   
    import {
         Nav,
         Modal,
         ModalBody,
         ModalFooter,
         ModalHeader,
         NavItem,
         NavLink,
         Button,
         Table,
         UncontrolledAlert,
         Card,
         CardBody,
         CardFooter,
         CardHeader,
         CardSubtitle,
         CardText,
         CardTitle,
     } from "sveltestrap";
     
     import {
        pop
     } from "svelte-spa-router";
 
     
     const BASE_API_URL = "/api/v2/children-employment"; //tiene que llamar a la API para tratar los datos
     
     let cargados = false;
     let employmentData = [];
 
     let isOpen = false;
 
     let limit =10;
     let offset =0;
     let pagina = (offset/10)+1;
     let num_paginas=0;
     let flags ="";
     let filtros_act= false;
 
     getEmploymentData();
 
     let newEmploymentData = {
             country:"",
             year:"",
             percent_children_employment_m: "" ,
             percent_children_employment_f:"",
             percent_children_employment_t:""
         }
         let employmentDatabusqueda = {
             country:"",
             year:"",
             percent_children_employment_m: "" ,
             percent_children_employment_f:"",
             percent_children_employment_t:""
         }
         
      //funcion asincrona para cargar (get) los recursos existentes
      async function getNumPaginas() {
             console.log("Fetching employment resourcers...");
             const res = await fetch(BASE_API_URL);
             let datos=[]
             if(res.ok){
                 const json = await res.json();
                 datos = json;
                 num_paginas=(datos.length/10)+1|0;
                 if(datos.length%10==0&&num_paginas!==1){
                     num_paginas--;
                 }
 
             }else{
                 console.log("ERROR!");
             }
 
         }
 
 
      async function getEmploymentData() {
             getNumPaginas()
             console.log(num_paginas)
             console.log("Fetching hiv resourcers...");
           
             const res = await fetch(BASE_API_URL+"?limit="+limit+"&offset="+offset+flags);
             if(res.status==200){
                 const json = await res.json();
                 employmentData = json;
                 console.log(`Received ${employmentData.length} resources`);
                 pagina = (offset/10)+1
 
                 let mes="Hemos encontrado "+ employmentData.length +" elementos que concuerden con la búsqueda";
                 if(filtros_act) lanzamensaje(res.status,res.statusText,"Advertencia",mes,null)
             }
             else{
                 console.log("ERROR!");
                 lanzamensaje(res.status,res.statusText,"Error al obtener los elementos","No hemos encontrado ningún valor que concuerde con su búsqueda.",true)
             }
 
         }
 
         async function insertEmploymentData() { //insertar un recurso en concreto
             console.log("Inserting new resource " + JSON.stringify(newEmploymentData));
             newEmploymentData.country=newEmploymentData.country.replace(" ","_")
             const res = await fetch(BASE_API_URL, {
                 method: "POST",
                 
                 body: JSON.stringify(newEmploymentData),
                 headers: {
                     "Content-Type": "application/json",
                 }
             }
             ).then( (res) => {
                 getEmploymentData();
                 switch (res.status){
                     case 409:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error en el Insert","Ya existe un dato que con los mismos creedenciales",true)
                     break
 
                     case 409:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error en el Insert","Ha habido un problema con el cuerpo de la petición",true)
                     break
 
                     case 201:
                         let mensajeaux= "El dato: "+newEmploymentData.country+"/"+newEmploymentData.year+" ya forma parte de la base de datos." 
                     lanzamensaje(res.status,res.statusText,"El dato se ha insertado satisfactoriamente",mensajeaux,null)
                     break
 
                     default:
                     lanzamensaje(res.status,res.statusText,"Se ha producido un error al insertar un nuevo valor","No se han insertado los datos correctamente. Pruebe de nuevo",true)
                     break
                 }
             })
             
         }
 
         async function deleteEmploymentData( a, b) { //elimina un recurso en concreto
             
             console.log("Deleting resource " + JSON.stringify(employmentData));
             const res = await fetch(BASE_API_URL+"/"+a+"/"+b, {
                 method: "DELETE",
               
             })
             switch(res.status){
             case 200:
             let mensajeaux= "El dato: "+a+"/"+b+" ya forma no parte de la base de datos." 
                     lanzamensaje(res.status,res.statusText,"El dato se ha eliminado satisfactoriamente",mensajeaux,null)
                     if(employmentData.length==1&&num_paginas>1){
                         offset-=10; getEmploymentData()
                      }else{
                         getEmploymentData();
                     }
             break;
             case 404:
             let mensajeaux2= "El dato: "+a+"/"+b+" no se ha encontrado"    
             lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento",mensajeaux2,true)
 
             break;
             default:
             lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
             break;
             
         }
         }
 
         async function loadStats(){
         deleteStats();
         console.log("Loading employmentData...");
         const carga =  await fetch(BASE_API_URL + "/loadInitialData");
         cargados = true;
         if (carga.ok){
             console.log("Ok.");
             const res = await fetch(BASE_API_URL);
             if(res.ok){
                 console.log("Ok. Obtaining employmentData...")
                 const json = await res.json();
                 employmentData = json;
                 getEmploymentData();
                 console.log('Received ${employmentData.length} life stats.');
                 let mensajeaux = " Se han cargado un total de " + employmentData.length + " elementos."
                 lanzamensaje(res.status,res.statusText,"Los datos se han cargado satisfactoriamente",mensajeaux,null)
             }else{
                 lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar cargar los datos",
                 "",
                 true)
                    
                 console.log("Error, there is no employmentData.")
             }
         }else{
             lanzamensaje(carga.status,carga.statusText,"Se ha producido un error al intentar cargar los datos","Vuelva a intentar cargar los datos o compruebe que existen valores",true)
                          
             console.log("Error loading employmentData.");
         }
     }
    
     async function deleteStats() {
         console.log("Deleting life stats...");
         cargados=false;
         const res = await fetch(BASE_API_URL, {
             method: "DELETE"
         }).then(function (res) {
             if (res.status==200){
                 console.log("Ok.");
                 let mensajeespecifico ="Se han eliminado todos los elementos."
                 employmentData = [];
                 lanzamensaje(res.status,res.statusText,"Los datos se han eliminado satisfactoriamente",mensajeespecifico ,null)
             } else if (res.status==404){ //no employmentData found
                 console.log("No employmentData found");
                 lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos","No existen datos que eliminar" ,true)
             } else  { 
                 console.log("Error deleting DB stats");
                 lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos","Lo siento, no hemos podido eliminar los datos." ,true)
             }
             
         });
          
      
     }
 
      //Insert
     let open1 = false;
     const toggle1 = () => (open1 = !open1);
     const toggle1P = () => {
         open1 = !open1;
         console.log("Imprimo: "+newEmploymentData.country.length)
         if(newEmploymentData.country.replace(' ', '').length!=0 
         &&newEmploymentData.year.replace(' ', '').length!=0 
         && newEmploymentData.percent_children_employment_m.length!=0 
         && newEmploymentData.percent_children_employment_f.length!=0 
         && newEmploymentData.percent_children_employment_t.length!=0){
 
         insertEmploymentData()
         getEmploymentData();
         }
         else{
 
             console.log("Nada añadido")
             popinsert=true;
         }
 
     };
 
     let popinsert = false;
     const togglepop = () => (popinsert = !popinsert);
     const togglepopok = () => {
         popinsert = !popinsert;
         open1=true}
     
     function gotoupdate(a,b) {
     location.href = '#/children-employment/'+a+'/'+b;
 }
 //paginacion
 
 const siguiente= () => {offset+=10; getEmploymentData()}
 const anterior= () => {offset-=10; getEmploymentData()}
 
 //Busqueda especifica
 
 
 
     let popbusqueda = false;
     const cancelarbusqueda = () => (popbusqueda = !popbusqueda);
     const buscar = () => {
         popbusqueda = !popbusqueda
         
         if(employmentDatabusqueda.country.replace(" ","").length!=0){
             flags= flags+"&country="+employmentDatabusqueda.country;
         }
         if(employmentDatabusqueda.year.replace(" ","").length!=0){
             flags= flags+"&year="+employmentDatabusqueda.year;
         }
         if(employmentDatabusqueda.percent_children_employment_m.replace(" ","").length!=0){
             flags= flags+"&percent_children_employment_m="+employmentDatabusqueda.percent_children_employment_m;
         }
         if(employmentDatabusqueda.percent_children_employment_f.replace(" ","").length!=0){
             flags= flags+"&percent_children_employment_f="+employmentDatabusqueda.percent_children_employment_f;
         }
         if(employmentDatabusqueda.percent_children_employment_t.replace(" ","").length!=0){
             flags= flags+"&percent_children_employment_t="+employmentDatabusqueda.percent_children_employment_t;
         }
         
         filtros_act=true
         getEmploymentData()
     }
 
         const quitafiltros =() => {
             flags="";
             filtros_act=false;
             getEmploymentData();
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
   
 <!-- svelte-ignore missing-declaration -->
 <main>
    <h1 style="text-align: center;">Administrador de datos de <strong>Niños/as empleados</strong></h1>
     <div>
               <!-- Modal para insertar -->
             <div id="modal">
             <Modal isOpen={open1} toggle={toggle1} transitionOptions>
                 <ModalHeader {toggle1}>¿Quieres insertar un nuevo dato?</ModalHeader>
                 <ModalBody >
                     Por favor, rellene el formulario. Todos los campos deben tener un valor, de lo contrario, no se añadirá nada.
                     <tr>
                         <Table >
                             
                             <tbody>
                                   <tr>
                                         <td>País</td>
                                         <td><input bind:value="{newEmploymentData.country}"></td>
                                         
                                         
                                     </tr><tr>
                                         <td>Año</td>
                                         <td><input bind:value="{newEmploymentData.year}"> </td>
                                    
                                         
                                     </tr><tr>
                                         <td>Niños empleados</td>
                                         <td><input bind:value="{newEmploymentData.percent_children_employment_m}"> </td>
                                        
                                     </tr><tr>
                                         <td>Niñas empleadas</td>
                                         <td><input bind:value="{newEmploymentData.percent_children_employment_f}"> </td>
                                         
                                         
                                     </tr><tr>
                                         <td>Total de niñ@s empleados</td>
                                         <td><input bind:value="{newEmploymentData.percent_children_employment_t}"> </td>
                                    </tr>
   
                             </tbody>
                         </Table >
                     </tr>
                 </ModalBody>
                 <ModalFooter>
                     <Button color="primary" on:click={toggle1P}>Insertar</Button>
                     <Button color="secondary" on:click={toggle1}
                         >Cancelar</Button
                     >
                 </ModalFooter>
             </Modal>
 
             <!-- Modal para la busqueda -->
 
             <Modal isOpen={popbusqueda} toggle={cancelarbusqueda} transitionOptions>
                 <ModalHeader {cancelarbusqueda}>¿Desea hacer una búsqueda específica?</ModalHeader>
                 <ModalBody >
                    Por favor, introduzca los valores necesarios.
                     <tr>
                         <Table >
                             
                             <tbody>
                                    
                                     <tr>
                                         <td>País</td>
                                         <td><input bind:value="{employmentDatabusqueda.country}"></td>
                                         
                                         
                                     </tr><tr>
                                         <td>Año</td>
                                         <td><input bind:value="{employmentDatabusqueda.year}"> </td>
                                    
                                         
                                     </tr><tr>
                                         <td>Niños empleados</td>
                                         <td><input bind:value="{employmentDatabusqueda.percent_children_employment_m}"> </td>
                                        
                                     </tr><tr>
                                         <td>Niñas empleadas</td>
                                         <td><input bind:value="{employmentDatabusqueda.percent_children_employment_f}"> </td>
                                         
                                         
                                     </tr><tr>
                                         <td>Total de niñ@s empleados</td>
                                         <td><input bind:value="{employmentDatabusqueda.percent_children_employment_t}"> </td>
                                    </tr>   
                             </tbody>
                         </Table >
                     </tr>
                 </ModalBody>
                 <ModalFooter>
                     <Button color="primary" on:click={buscar}>Buscar</Button>
                     <Button color="secondary" on:click={cancelarbusqueda}
                         >Cancelar</Button
                     >
                 </ModalFooter>
             </Modal>
 
             <Modal isOpen={popinsert} toggle={togglepop} transitionOptions>
                 <ModalHeader {togglepop}>Se ha producido un error</ModalHeader>
                 <ModalBody >
                     No se ha podido insertar el dato.
                    
                 </ModalBody>
                 <ModalFooter>
                     <Button color="primary" on:click={togglepopok}>Probar de nuevo</Button>
                     <Button color="secondary" on:click={togglepop}>Cancelar</Button>
                 </ModalFooter>
             </Modal>
 
             <Modal isOpen={alerta} toggle={togglealerta} transitionOptions>
                 <ModalHeader toggle={togglealerta} style="text-align: center;">{mensaje}
                 
                     
                 </ModalHeader>
                 <ModalBody style="text-align: center;">
                     {#if error!=null}
                         {#if error}
                         Tras realizar la operación hemos obtenido un codigo de error:
                         <p></p>
                         <a href="https://docs.google.com/presentation/d/1i79Yihxsynbjtar05xFXLXHChqEbsO44oaxg8mXWL6g/edit#slide=id.g10ecd5ec32_1_14"> 
                             {rescodigo} ({resstatus}).
                         </a>
                          
                         <p>{mensajeespecifico}</p>
                         
                         {/if}
                     {:else}
                     <p>{mensajeespecifico}</p>
                     {/if}
 
                     <div>
                         <p></p>
                     <Button color="secondary" on:click={togglealerta}>Volver</Button>
                 </div>
                 </ModalBody>
                 
             </Modal>
         </div>
 
 
     </div>
     
   
     {#if employmentData.length != 0}
         <br/>
         <Table bordered responsive hover>
         <thead>
             
             <tr>
                 <td>País</td>
                 <td>Año</td>
                 <td>Niños empleados</td>
                 <td>Niñas empleadas</td>
                 <td>Total de niñ@s empleados</td>
                 <td>Acciones</td>
             </tr>
             <tr>
                <td><input type="text" placeholder="Acerbaijan" bind:value="{newEmploymentData.country}"></td>
                <td><input type="number" placeholder="2005" min=1960 bind:value="{newEmploymentData.year}"></td>
                <td><input type="number" placeholder="6" min=0 bind:value="{newEmploymentData.percent_children_employment_m}"></td> 
                <td><input type="number" placeholder="4.4" min=0 bind:value="{newEmploymentData.percent_children_employment_f}"></td>    
                <td><input type="number" placeholder="5.2" min=0 bind:value="{newEmploymentData.percent_children_employment_t}"></td>  
                <td><Button outline color="primary" on:click={insertEmploymentData}>Insertar</Button></td>           
            </tr>
         </thead>
         <tbody>
             {#each employmentData as employmentData}
                 <tr>
                     <td><a href="#/children-with-hiv/{employmentData.country}/{employmentData.year}">{employmentData.country}</a></td>
                     <td>{employmentData.year}</td>
                     <td>{employmentData.percent_children_employment_m}</td>
                     <td>{employmentData.percent_children_employment_f}</td>
                     <td>{employmentData.percent_children_employment_t}</td>

                     <td>
                         <Button outline color="danger" on:click={() =>deleteEmploymentData(employmentData.country,employmentData.year)}> Borrar </Button>
                         <Button outline color="success" on:click={() =>gotoupdate(employmentData.country,employmentData.year) }> Actualizar</Button>
                     </td>
                   
 
 
 
                 </tr>
             {/each}
         </tbody>
     </Table >
     
     {/if}

     {#if employmentData.length === 0}
            <p>No se han encontrado datos, por favor, carga los datos iniciales.</p>
        {/if}

        <p></p>
        <Button outline color="success" on:click="{loadStats}">
            Cargar datos inciales
        </Button>
        <Button outline color="danger" on:click="{deleteStats}">
            Eliminar todo
        </Button>
        {#if !filtros_act} 
        <Button outline color="info" on:click={cancelarbusqueda}> Buscar </Button>
        {:else}
        <Button outline color="info" on:click={quitafiltros}> Quitar filtros </Button>
        <p style="text-align: rigth; background-color: antiquewhite;">Desactive los filtros para realizar otra búsqueda</p>
        {/if}
        <p></p>
        <Button color="dark" on:click={pop}>Volver</Button>

        {#if employmentData.length !== 0}
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
 
 
 <style>
    
     a:hover {
         color:white;
     }
 
 </style>