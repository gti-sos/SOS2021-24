<script>
  
const BASE_API_PATH = "/api/v2";
let schoolData = [];
let schoolChartCountryDateData = [];
let schoolChartchildrenOutSchoolMale = [];
let schoolChartchildrenOutSchoolFemale = [];
let schoolChartchildrenOutSchoolTotal = [];

async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_API_PATH + "/children-out-school");
    schoolData = await res.json();
    if (res.ok) {
        schoolData.forEach(stat => {
        schoolChartCountryDateData.push(stat.country+"/"+stat.year);
        schoolChartchildrenOutSchoolMale.push(stat["children_out_school_male"]);
        schoolChartchildrenOutSchoolFemale.push(stat["children_out_school_female"]);
        schoolChartchildrenOutSchoolTotal.push(stat["children_out_school_total"]);   
      });
    }
    
    console.log("Children out school chart: " + schoolData);
    
    Highcharts.chart("container", {
      chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 20,
            depth: 50,
            viewDistance: 60
        }
    },
      title: {
        text: "Abandono escolar en el Siglo XXI",
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      xAxis: {
        title: {
          text: "",
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
              backgroundColor: "gray",
            },
          ],
        },
      ],
     plotOtions: {
        series: {
            depth: 30,
            colorByPoint: false
        }
    },
      series: [
        {
          name: "Abandono escolar (Niños)",
          data: schoolChartchildrenOutSchoolMale,
          color: "#3c8dbc"
        },
        {
          name: "Abandono escolar (Niñas)",
          data: schoolChartchildrenOutSchoolFemale,
          color: "#7DCEA0",
        },
        {
          name: "Abandono escolar (Total)",
          data: schoolChartchildrenOutSchoolTotal,
          color: "#EC7063",
        }
        
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 3000,
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
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/cylinder.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <div>
        <h1 style="text-align: center;">Analítica <strong>(Abandono Escolar)</strong></h1>
      </div>
    
    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p style="text-align: center;" class="highcharts-description">
            Gráfico 3D que muestra los diferentes valores de abandono escolar en varios países y años.
          </p>
        </figure>
      </div>
</main>

<style>
  .highcharts-figure {
      min-width: 320px; 
      max-width: 1400px;
      margin: 1em auto;
  }
</style>