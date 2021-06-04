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
    Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Niños empleados en el siglo XXI'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: employmentChartCountryDateData,
        plotBands: [{ // visualize the years
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Valor'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
          name: "Niños empleados",
          data: employmentChartchildrenEmploymentMale,
          //color: "#3c8dbc"
        },
        {
          name: "Niñas empleadas",
          data: employmentChartchildrenEmploymentFemale,
          //color: "#7DCEA0",
        },
        {
          name: "Total de niñ@s emplead@s",
          data: employmentChartchildrenEmploymentTotal,
          //color: "#EC7063",
        }]
  });
  }
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
      
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script
        src="https://code.highcharts.com/modules/accessibility.js"></script>
    

</svelte:head>

<main>

    <div>
        <h1 style="text-align: center;">Analítica <strong>(Niñ@s emplead@s)</strong></h1>
      </div>
    
    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p class="highcharts-description">
            Gráfico de líneas básico que muestra los diferentes valores de niños empleados en varios países.
          </p>
        </figure>
      </div>

</main>

<style>
    #container {
    height: 400px; 
}

.highcharts-figure{
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}
</style>