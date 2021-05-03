<script>
    import { onMount } from "svelte";
    import { Table, Button} from "sveltestrap";
    import {pop} from "svelte-spa-router";
    import {UncontrolledAlert} from "sveltestrap";

    export let params = {};
    let HIVData = {};

    let updateCountry = "";
    let updateYear = 0;
    let updateLiving = 0;
    let updateNewly = 0;
    let updateTotal = 0;

    let errorMsg = "";
    let okMsg = "";
    
    async function getHIVData() {
      console.log("Fetching stat..." + params.country + " " + params.year);
      const res = await fetch("api/v2/children-with-hiv/" + params.country +"/" + params.year
      );
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        HIVData = json;
        updateCountry = HIVData.country;
        updateYear = HIVData.year;
        updateLiving = HIVData["living_with"];
        updateNewly = HIVData["newly_infected"];
        updateTotal = HIVData["total_infected"];
        console.log("Received hiv data.");
        
      } else {
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR!" + errorMsg);
      }
    }

    async function updateHIVData() {
        if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
            console.log("Updating stat..." + JSON.stringify(params.country) + JSON.stringify(params.year));
            const res = await fetch("/api/v2/children-with-hiv/" + params.country +"/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "living_with": parseInt(updateLiving),
                "newly_infected": parseInt(updateNewly),
                "total_infected": parseInt(updateTotal),
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getHIVData();
          errorMsg = "";
          okMsg = "Entrada actualizada correctamente";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          getHIVData();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    }
    onMount(getHIVData);
  </script>
  
  <main>
    <h2 style="text-align: center;">
      Editar entrada: Niños/as con VIH en <strong>{params.country}</strong> en el año <strong>{params.year}</strong>
    </h2>
    
    {#await HIVData}
        Loading hiv Data...
    {:then hiv}

    {#if errorMsg}
            <UncontrolledAlert color="danger" >{errorMsg}</UncontrolledAlert>
	    {/if}

        {#if okMsg}
            <UncontrolledAlert color = "success">{okMsg}</UncontrolledAlert>
        {/if}

    <Table bordered responsive hover>
      <thead>
        <tr>
          <th>País </th>
          <th>Año </th>
          <th>Viviendo con VIH</th>
          <th>Nuevos infectados</th>
          <th>Total de infectados</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{updateCountry}</td>
          <td>{updateYear}</td>
          <td><input type="number" bind:value={updateLiving} /></td>
          <td><input type="number" bind:value={updateNewly} /></td>
          <td><input type="number" bind:value={updateTotal} /></td>
          <td>
            <Button outline color="warning" on:click={updateHIVData}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    {/await}
   <Button outline color="secondary" on:click="{pop}">Volver</Button>
  </main>