<script>
import { onMount } from "svelte";
  
const BASE_CONTACT_API_PATH = "/api/v2";
let schoolData = [];
let schoolChartData = [];
let schoolChartCountryDateData = [];
let schoolChartchildrenOutSchoolMale = [];
let schoolChartchildrenOutSchoolFemale = [];
let schoolChartchildrenOutSchoolTotal = [];


async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/children-out-school");
    schoolData = await res.json();
    if (res.ok) {
        schoolData.forEach(stat => {
        schoolChartCountryDateData.push(stat.country+"/"+stat.year);
        schoolChartchildrenOutSchoolMale.push(stat["children_out_school_male"]);
        schoolChartchildrenOutSchoolFemale.push(stat["children_out_school_female"]);
        schoolChartchildrenOutSchoolTotal.push(stat["children_out_school_total"]);   
      });
    }
    
    console.log("Children out school chart: " + schoolChartData);
    Highcharts.chart("container", {
      title: {
        text: "Abandono escolar Siglo XXI",
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
        categories: schoolChartCountryDateData,
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
          name: "Abandono escolar (Niños)",
          data: schoolChartchildrenOutSchoolMale,
        },
        {
          name: "Abandono escolar (Niñas)",
          data: schoolChartchildrenOutSchoolFemale,
        },
        {
          name: "Abandono escolar (Total)",
          data: schoolChartchildrenOutSchoolTotal,
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
        <h1 style="text-align: center;">Analítica <strong>(Abandono Escolar)</strong></h1>
      </div>
    
    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p class="highcharts-description">
            Gráfico de líneas básico que muestra los diferentes valores de abandono escolar en varios países.
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