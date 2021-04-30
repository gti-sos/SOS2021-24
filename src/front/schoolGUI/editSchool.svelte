<script>
    import { onMount } from "svelte";
    import { Table, Button } from "sveltestrap";
    const BASE_CONTACT_API_PATH = "/api/v1";

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
      const res = await fetch("api/v1/children-out-school/" + params.country +"/" + params.year
      );
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        schoolData = json;
        updateCountry = schoolData.country;
        updateDate = schoolData.year;
        updateMale = schoolData["children_out_school_male"];
        updateFemale = schoolData["children_out_school_female"];
        updateTotal = schoolData["children_out_school_total"];
        console.log("Received school data.");
        
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg="";
        console.log("ERROR!" + errorMsg);
      }
    }

    async function updateSchoolData() {
        if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
            console.log("Updating stat..." + JSON.stringify(params.country) + JSON.stringify(params.year));
            const res = await fetch("/api/v1/children-out-school/" + params.country +"/" + params.date,
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
          getStat();
          errorMsg = "";
          okMsg = "Entrada actualizada correctamente";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          okMsg = "";
          getStat();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    }
    onMount(getSchoolData);
  </script>
  
  <main>
    <h3>
      Editar entrada: Abandono escolar en <strong>{params.country}</strong> en el año <strong>{params.date}</strong>
    </h3>
    {#if errorMsg}
      <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
    <p style="color: green">{okMsg}</p>
    {/if}

    <Table bordered>
      <thead>
        <tr>
          <th>País </th>
          <th>Año </th>
          <th>Abandono escolar (Niños) </th>
          <th>Abandono escolar (Niñas) </th>
          <th>Abandono escolar (Total) </th>
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
            <Button outline color="primary" on:click={updateSchoolData}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    <a href="#/children-out-school"> <Button outline color="secondary">Volver</Button></a>
  </main>
  
  <style>
    main{
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>