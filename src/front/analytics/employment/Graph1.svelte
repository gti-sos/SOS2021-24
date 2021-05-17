<script>
    import { onMount } from "svelte";
      
    const BASE_CONTACT_API_PATH = "/api/v2";
    let employmentData = [];
    let employmentChartData = [];
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
    
    console.log("Children employment chart: " + employmentChartData);
    Highcharts.chart("container", {
      title: {
        text: "Niños empleados Siglo XXI",
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      xAxis: {
        title: {
          text: "País/Año",
        },
        categories: employmentChartCountryDateData,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "date",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      series: [
        {
          name: "Niños empleados",
          data: employmentChartchildrenEmploymentMale,
        },
        {
          name: "Niñas empleadas",
          data: employmentChartchildrenEmploymentFemale,
        },
        {
          name: "Total de niñ@s emplead@s",
          data: employmentChartchildrenEmploymentTotal,
        }
        
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
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
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div{
      margin-bottom: 15px;
    }
    p {
      display: inline;
    }
  </style>