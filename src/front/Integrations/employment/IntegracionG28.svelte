<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  var employmentData = [];
  var plataformData = [];
  var errorMsg = "";    
  let correctMsg = "";
  const BASE_EMPLOYMENT_API_URL = "/api/v2/children-employment";
  const BASE_API_URL_04 = "/api/v1/platforms";

  async function loadMyStats() {
    console.log("Loading data...");
    const res = await fetch(
        BASE_EMPLOYMENT_API_URL + "/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        errorMsg = "";
        correctMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        correctMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  async function getMyStats() {
    console.log("Fetching data...");
    await loadMyStats();
    const res = await fetch(BASE_EMPLOYMENT_API_URL);
    if (res.ok) {
      console.log("OK");
      employmentData = await res.json();
      correctMsg = "";
      console.log(`We have received ${employmentData.length} life-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }
    async function loadAPI() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_04).then(
          function (res) {
            if (res.ok) {
              errorMsg = "";
              console.log("OK");
            } else {
              if (res.status === 500) {
                errorMsg = "No se ha podido acceder a la base de datos";
              }
              console.log("ERROR!" + errorMsg);
            }
          }
        );
      }
    
      
      async function getPlataformData() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_04);
    
        if (res.ok) {
          const json = await res.json();
          plataformData = json;
          console.log(`We have received ${plataformData.length} stats.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }

      async function loadChart(){
        console.log("pasando por loadchart");
        await getMyStats();
        await getPlataformData();

        var paises2014 = [];
        var valores = [];
        

        plataformData.forEach((stat) => {
            if(stat.year==2014){
                paises2014.push(stat.country);
                valores.push(stat["sold-unit"]);
            }

        });

        employmentData.forEach((stat) => {
            if(stat.year==2014 && stat.country == "sudan"){
                paises2014.push(stat.country);
                valores.push(stat["percent_children_employment_t"]);
            }
        });
        console.log(paises2014);
        
        var data = [{
            type: "sunburst",
            labels: paises2014,
            parents: ["", "" ],
            values:  valores,
            outsidetextfont: {size: 20, color: "#377eb8"},
            leaf: {opacity: 0.4},
            marker: {line: {width: 2}},
        }];

        var layout = {
             margin: {l: 0, r: 0, b: 0, t: 0},
            width: 500,
            height: 500
        };


    Plotly.newPlot('myDiv', data, layout);

      }
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.3.min.js'on:load={loadChart}></script>
</svelte:head>

<main>
    <h3>Integración con la API del grupo 28 de SOS</h3>
    <p>Comparacion del porcentaje de niños empleados en 2014 en Sudán con el numero de unidades de plataformas vendidas en 2014 en España</p>
    <body>
        <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    </body>
    {#if errorMsg}
    <p>{errorMsg}</p>
    {/if}
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    
  </style>