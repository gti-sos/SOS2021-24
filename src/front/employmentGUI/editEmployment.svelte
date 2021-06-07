<script>
    import { onMount } from "svelte";
    import { Table, Button} from "sveltestrap";
    import {pop} from "svelte-spa-router";
    import {UncontrolledAlert,Nav,NavItem,NavLink} from "sveltestrap";

    export let params = {};
    let employmentData = {};

    let updateCountry = "";
    let updateYear = 0;
    let updateMale = 0;
    let updateFemale = 0;
    let updateTotal = 0;

    let errorMsg = "";
    let okMsg = "";
    
    async function getEmploymentData() {
      console.log("Fetching stat..." + params.country + " " + params.year);
      const res = await fetch("api/v2/children-employment/" + params.country +"/" + params.year
      );
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        employmentData = json;
        updateCountry = employmentData.country;
        updateYear = employmentData.year;
        updateMale = employmentData["percent_children_employment_m"];
        updateFemale = employmentData["percent_children_employment_f"];
        updateTotal = employmentData["percent_children_employment_t"];
        console.log("Received employment data.");
        
      } else {
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR!" + errorMsg);
      }
    }

    async function updateEmploymentData() {
        //if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
            console.log("Updating stat..." + JSON.stringify(params.country) + JSON.stringify(params.year));
            const res = await fetch("/api/v2/children-employment/" + params.country +"/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "percent_children_employment_m": parseFloat(updateMale),
                "percent_children_employment_f": parseFloat(updateFemale),
                "percent_children_employment_t": parseFloat(updateTotal),
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getEmploymentData();
          errorMsg = "";
          okMsg = "Entrada actualizada correctamente";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          getEmploymentData();
          console.log("ERROR!" + errorMsg);
        }
      });
    //}
    }
    onMount(getEmploymentData);
  </script>
  
  <main>
    <h2 style="text-align: center;">
      Editar entrada: Niños empleados en <strong>{params.country}</strong> en el año <strong>{params.year}</strong>
    </h2>
    
    {#await employmentData}
        Loading employment Data...
    {:then employment}

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
          <th>Niños empleados</th>
          <th>Niñas empleadas</th>
          <th>Total de niñ@s emplead@s</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{updateCountry}</td>
          <td>{updateYear}</td>
          <td><input type="number" bind:value={updateMale} /></td>
          <td><input type="number" bind:value={updateFemale} /></td>
          <td><input type="number" bind:value={updateTotal} /></td>
          <td>
            <Button outline color="warning" on:click={updateEmploymentData}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    {/await}
   <Button outline color="secondary" href="#/children-employment">Volver</Button>
  </main>