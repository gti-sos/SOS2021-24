<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  var employmentData = [];
  var povertyData = [];
  var errorMsg = "";    
  let correctMsg = "";
  const BASE_EMPLOYMENT_API_URL = "/api/v2/children-employment";
  const BASE_API_URL_04 = "https://endpoint-poverty-risks.herokuapp.com/api/v1?y=2015";

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
    
      
      async function getPovertyData() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_04);
    
        if (res.ok) {
          const json = await res.json();
          povertyData = json;
          console.log(`We have received ${povertyData.length} stats.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }

      async function loadChart(){
        console.log("pasando por loadchart");
        await getMyStats();
        await getPovertyData();
        
        var paisesPob = [];
        var porcentajeRiesgoPobreza = [];
        var paisesEmp = [];
        var porcentajeEmpleados = [];

        povertyData.forEach((stat) => {
            if(stat.year == 2015){
                paisesPob.push(stat.country);
                porcentajeRiesgoPobreza.push(stat["percentage_risk_of_poverty"]);
            }
        });
        console.log(paisesPob);

        employmentData.forEach((stat) => {
            if(stat.year == 2015){
                paisesEmp.push(stat.country);
                porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }
        });

        var data = [
            {
                histfunc: "sum",
                y: porcentajeRiesgoPobreza,
                x: paisesPob,
                type: "histogram",
                name: "Porcentaje de países en riesgo de pobreza"
            },
            {
                histfunc: "sum",
                y: porcentajeEmpleados,
                x: paisesEmp,
                type: "histogram",
                name: "Porcentaje niños empleados"
             }
        ]

        Plotly.newPlot('myDiv', data)


      }

</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.3.min.js'on:load={loadChart}></script>
</svelte:head>

<main>
    <h3>Integración con la API del grupo 04 de SOS</h3>
    <p>Comparacion del porcentaje de niños empleados con el porcentaje en riego de pobreza en diferentes países en el año 2015</p>
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