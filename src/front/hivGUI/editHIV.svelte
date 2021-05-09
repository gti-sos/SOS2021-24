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


onMount(getHIVData);

let HIVData = {};
let country;
let year; 
let living_with;
let newly_infected;
let total_infected;



async function getHIVData(){
    console.log("Buscando datos...");
    const res = await fetch("/api/v2/children-with-hiv/"+params.country+"/"+params.year);
    switch(res.status){
    case 200:
        console.log("OK!");
        const json= await res.json();
        HIVData = json ;
        country = HIVData.country;
        year = HIVData.year;
        living_with = HIVData.living_with;
        newly_infected = HIVData.newly_infected;
        total_infected= HIVData.total_infected;   
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

async function updateHIVData(){
    console.log('Actualizando datos con '+ JSON.stringify(params.country)+" "+JSON.stringify(params.year));
    const res = await fetch("/api/v2/children-with-hiv/"+country+"/"+year,{
        method: "PUT",
        body: JSON.stringify({
            country: country,
            year: year,
            living_with: living_with,
            newly_infected: newly_infected,
            total_infected: total_infected
            
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
const actualiza = () => {updateHIVData(); popactualizar = !popactualizar};

function gomain() {
location.href = '#/children-with-hiv';
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
             <td>Viviendo con VIH</td>
             <td>Nuevos infectados</td>
             <td>Total de infectados</td>


           
         </tr>
     </thead>
     <tbody>
         
              <tr>
                
                <td>{country}</td>
                <td>{year} </td>
                <td><input bind:value="{living_with}"> </td>
                <td><input bind:value="{newly_infected}"> </td>
                <td><input bind:value="{total_infected}"> </td>
                <td>
                  <Button outline color="warning" on:click={updateHIVData}>Actualizar</Button>
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