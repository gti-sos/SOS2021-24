<script>
    import { onMount } from "svelte";
      
    const BASE_CONTACT_API_PATH = "/api/v2";
    let employmentData = [];
    let employmentChartCountryDateData = [];
    let employmentChartchildrenEmploymentMale = [];
    let employmentChartchildrenEmploymentFemale = [];
    let employmentChartchildrenEmploymentTotal = [];
    
    
    async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/children-employment");
    employmentData = await res.json();
    if (res.ok) {
        employmentData.forEach(stat => {
        employmentChartCountryDateData.push(stat.country+"/"+stat.year);
        employmentChartchildrenEmploymentMale.push(stat["percent_children_employment_m"]);
        employmentChartchildrenEmploymentFemale.push(stat["percent_children_employment_f"]);
        employmentChartchildrenEmploymentTotal.push(stat["percent_children_employment_t"]);   
      });
    }
    
    console.log("Children employment chart: " + employmentData);
        var trace1 = {
            x : employmentChartCountryDateData,
            y : employmentChartchildrenEmploymentMale,
            name: 'Número de niños empleados',
            type : 'bar'
        };
        var trace2 = {
            x : employmentChartCountryDateData,
            y : employmentChartchildrenEmploymentFemale,
            name: 'Número de niñas empleadas',
            type : 'bar'
        };
        var trace3 = {
            x : employmentChartCountryDateData,
            y : employmentChartchildrenEmploymentTotal,
            name: 'Número Total de niños empleados',
            type : 'bar'
        };
        var data = [trace1, trace2, trace3];
       var layout = {barmode: 'group'};
        Plotly.newPlot('myDiv', data, layout);   
    }
    </script>
    
    <svelte:head>
        <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load={loadChart}></script>
    </svelte:head>
    
    
    <main>

               
        
    
        <div>
            <h1 style="text-align: center;">Analítica <strong>(Niñ@s emplead@s)</strong></h1>
          </div>
        <body>
            <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
            <p class="highcharts-description">
                Gráfico de líneas básico que muestra los diferentes valores de niños empleados en varios países.
              </p>
        </body>
        
    
    </main>

    
<style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>