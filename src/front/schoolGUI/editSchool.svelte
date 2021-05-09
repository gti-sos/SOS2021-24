<script>
    import { onMount } from "svelte";
    import { Table, Button} from "sveltestrap";
    import {pop} from "svelte-spa-router";
    import {UncontrolledAlert,Nav,NavItem,NavLink} from "sveltestrap";

    export let params = {};
    let schoolData = {};

    let updateCountry = "";
    let updateYear = 0;
    let updateMale = 0;
    let updateFemale = 0;
    let updateTotal = 0;

    let errorMsg = "";
    let okMsg = "";
    
    async function getSchoolData() {
      console.log("Fetching stat..." + params.country + " " + params.year);
      const res = await fetch("api/v2/children-out-school/" + params.country +"/" + params.year
      );
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        schoolData = json;
        updateCountry = schoolData.country;
        updateYear = schoolData.year;
        updateMale = schoolData["children_out_school_male"];
        updateFemale = schoolData["children_out_school_female"];
        updateTotal = schoolData["children_out_school_total"];
        console.log("Received school data.");
        
      } else {
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR!" + errorMsg);
      }
    }

    async function updateSchoolData() {
        if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
            console.log("Updating stat..." + JSON.stringify(params.country) + JSON.stringify(params.year));
            const res = await fetch("/api/v2/children-out-school/" + params.country +"/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "children_out_school_male": parseInt(updateMale),
                "children_out_school_female": parseInt(updateFemale),
                "children_out_school_total": parseInt(updateTotal),
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getSchoolData();
          errorMsg = "";
          okMsg = "Entrada actualizada correctamente";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          getSchoolData();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    }
    onMount(getSchoolData);
  </script>
  
  <main>
    <h2 style="text-align: center;">
      Editar entrada: Abandono escolar en <strong>{params.country}</strong> en el año <strong>{params.year}</strong>
    </h2>
    
    {#await schoolData}
        Loading school Data...
    {:then school}

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
          <th>Abandono escolar (Niños)</th>
          <th>Abandono escolar (Niñas)</th>
          <th>Abandono escolar (Total)</th>
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
            <Button outline color="warning" on:click={updateSchoolData}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    {/await}
   <Button outline color="secondary" href="#/children-out-school">Volver</Button>
  </main>