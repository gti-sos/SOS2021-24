<script>
  import {onMount} from "svelte";
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
import {pop} from "svelte-spa-router";
export let params = {};


onMount(getEmploymentData);

let employmentData = {};
let country;
let year; 
let percent_children_employment_m;
let percent_children_employment_f;
let percent_children_employment_t;



async function getEmploymentData(){
    console.log("Buscando datos...");
    const res = await fetch("/api/v2/children-employment/"+params.country+"/"+params.year);
    switch(res.status){
    case 200:
        console.log("OK!");
        const json= await res.json();
        employmentData = json ;
        country = employmentData.country;
        year = employmentData.year;
        percent_children_employment_m = employmentData.percent_children_employment_m;
        percent_children_employment_f = employmentData.percent_children_employment_f;
        percent_children_employment_t= employmentData.percent_children_employment_t;   
        lanzamensaje(res.status,res.statusText,"Se ha encontrado el recurso buscado",mensajeaux,null)
        
       
        console.log("datos recibido.");
    break;
    case 404:
        let mensajeaux2= "El dato: "+params.country+"/"+params.year+" no se ha encontrado en la Base de datos"    
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento",mensajeaux2,true)
        console.log("Error, algo ha ido mal");
    break;
    default:
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
    break;
    }
   
}

async function updateEmploymentData(){
    console.log('Actualizando datos con '+ JSON.stringify(params.country)+" "+JSON.stringify(params.year));
    const res = await fetch("/api/v2/children-employment/"+country+"/"+year,{
        method: "PUT",
        body: JSON.stringify({
            country: country,
            year: year,
            percent_children_employment_m: percent_children_employment_m,
            percent_children_employment_f: percent_children_employment_f,
            percent_children_employment_t: percent_children_employment_t
            
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(res){
       
        switch(res.status){
        case 200:
            botontomain=true;
            let mensajeaux= "El dato: "+params.country+"/"+params.year+" ha sido actualizado correctamente"    
        lanzamensaje(res.status,res.statusText,"Actualización exitosa",mensajeaux,null)
        break;
        case 400:
        break;
        case 404:
            let mensajeaux2= "El dato: "+params.country+"/"+params.year+" no se ha encontrado en la Base de datos"    
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al Actualizar",mensajeaux2,true)
            
        break;
        case 409:
        let mensajeaux3= "El dato: "+params.country+"/"+params.year+" ha solicitado actualizar el Estado, Año o Mes. Se ha denegado la actualización para velar por la integridad de la información"    
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al Actualizar",mensajeaux3,true)
        break;
        default:
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
   
        break;
        }
    });	
    
   

};
let popactualizar = false;
const toggleactualizar = () => (popactualizar = !popactualizar);
const actualiza = () => {updateEmploymentData(); popactualizar = !popactualizar};

function gomain() {
location.href = '#/children-employment';
}
let botontomain=false;
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
  <Table bordered responsive hover>
     <thead>
         <tr>
             <td>País</td>
             <td>Año</td>
             <td>Niños empleados</td>
             <td>Niñas empleadas</td>
             <td>Total de niñ@s empleados</td>


           
         </tr>
     </thead>
     <tbody>
         
              <tr>
                
                <td>{country}</td>
                <td>{year} </td>
                <td><input bind:value="{percent_children_employment_m}"> </td>
                <td><input bind:value="{percent_children_employment_f}"> </td>
                <td><input bind:value="{percent_children_employment_t}"> </td>
                <td>
                  <Button outline color="warning" on:click={updateEmploymentData}>Actualizar</Button>
                </td>


                
            </tr>
         
     </tbody>
 </Table >
 <Button style="background-color: darkgray" on:click={pop}> Cancelar</Button>

 <Modal isOpen={popactualizar} toggle={toggleactualizar} transitionOptions>
    <ModalHeader {toggleactualizar}>¿Desea actualizar este dato?</ModalHeader>
    <ModalBody >
           Por favor pulse el botón "Actualizar" para confirmar la acción.       
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={actualiza}>Actualizar</Button>
        <Button color="secondary" on:click={toggleactualizar}>Cancelar</Button>
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
        <p>Causa:</p>
         
        <p>{mensajeespecifico}</p>
        
        {/if}
    {:else}
    <p>{mensajeespecifico}</p>
    {/if}

    <div>
        <p></p>
    <Button color="secondary" on:click={togglealerta}>Volver</Button>
    {#if botontomain}
    <Button color="secondary" on:click={gomain}>Volver a la tabla</Button>
    {/if}
</div>
</ModalBody>

</Modal>


</main>


<style>
  
</style>