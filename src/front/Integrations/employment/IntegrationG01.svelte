<script>
    import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

    var errorMsg = "";    
    let correctMsg = "";
    var data04 = [];
    var employmentData = [];
    const BASE_EMPLOYMENT_API_URL = "/api/v2/children-employment";
    const BASE_API_URL_01 = "/api/v1/divorce-stats";
    
    //INTEGRACION GRUPO 01
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
        const res = await fetch(BASE_API_URL_01).then(
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
    
      
      async function getData04() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_01);
    
        if (res.ok) {
          const json = await res.json();
          data04 = json;
          console.log(`We have received ${data04.length} stats.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
    
      async function loadChart(){
        console.log("pasando por loadchart");
        await getMyStats();
        await getData04();
    
        var total_Nempleados = [] ;
        var divorciados = [];
        var casados = [];
        data04.forEach(d => { 
            let country_minus = d.country.toLowerCase();             
            employmentData.forEach((data) =>{
                let c_m = data.country.toLowerCase();
               if(c_m == country_minus){
                    total_Nempleados.push(data["percent_children_employment_t"]);
                    divorciados.push(d["divorce-rate"]);
                    casados.push(d["marriage-rate"]);
               }
            })
        });
        //console.log(country_minus);
        console.log(casados);
        var trace1 = {
            type: "pointcloud",
            mode: "markers",
            name: 'Divorciados',
            text: ['Argentina', 'India'],
            marker: {
                sizemin: 0.5,
                sizemax: 100,
                arearatio: 0,
                color: "rgba(255, 0, 0, 0.6)"
            },
            x: divorciados,
            y: total_Nempleados
        };
             
        var trace2 = {
            type: "pointcloud",
            mode: "markers",
            name: 'Casados',
            text: ['Argentina', 'India'],
            marker: {
                sizemin: 0.5,
                sizemax: 100,
                arearatio: 0,
                color: "rgba(0, 0, 255, 0.9)",
                opacity: 0.8,
                blend: true
            },
            opacity: 0.7,
            x: casados,
            y: total_Nempleados
        }; 
        var data = [trace1, trace2];
        var layout = {
            title: "(Porcentaje Estado Civil, Porcentaje de Niños Empleados)",
            xaxis: {
                type: "linear",
                range: [
                -2.501411175139456,
                43.340777299865266],
                autorange: true
            },
            yaxis: {
                type: "linear",
                range: [4,6],
                autorange: true
            },
            height: 598,
            width: 1080,
            autosize: true,
            showlegend: true
        }
        Plotly.newPlot('myDiv', data, layout);
        
    }
    </script>
    
    <svelte:head>
        <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load={loadChart}></script>
    </svelte:head>
    
    
<main> 
            
    

    <h3>Integración con la API del grupo 01 de SOS</h3>
    <p>Comparacion del porcentaje de niños empleados en los países de India y Argentina con el porcentaje según el estado civil </p>
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