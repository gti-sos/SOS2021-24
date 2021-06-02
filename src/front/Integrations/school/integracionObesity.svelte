<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

let obesityData = [];
let obesityCountryDate = [];
let obesityMale= [];
let obesityFemale = [];

async function loadChart() {
    const res = await fetch("https://sos2021-10.herokuapp.com/api/integration/obesity-stats");
    obesityData = await res.json();
    if (res.ok) {
      obesityData.forEach((stat) => {
        obesityCountryDate.push(stat.country + "/" + stat.year);
        obesityMale.push(stat["man_percent"]);
        obesityFemale.push(stat["woman_percent"]);
      });
    }

    console.log(obesityData);
    Highcharts.chart("container", {
      chart: {
        type: "area",
      },
      title: {
        text: "Porcentaje de Obesidad en Hombres y Mujeres",
      },
      yAxis: {
        title: {
            text: 'Valor'
        },
    },
      xAxis: {
        title: {
          text: "País-Año",
        },
        categories: obesityCountryDate
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      tooltip: {
        pointFormat: '{series.name} <strong>{point.y}%<strong>'
    },
      series: [
        {
          name: "Hombres con sobrepeso",
          data: obesityMale,
        },
        {
          name: "Mujeres con sobrepeso",
          data: obesityFemale,
        },
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
  <script src="https://code.highcharts.com/highcharts.js"on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
    <div>
        <h1 style="text-align: center;">Uso <strong>API Obesity Stats</strong></h1>
      </div>
    
    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p style="text-align: center;" class="highcharts-description">
            Gráfico de área que muestra los diferentes valores de sobrepeso en varios países y años.
          </p>
        </figure>
        <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
      </div>
</main>
<style>
.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 1100px;
    margin: 1em auto;
}

#container {
    height: 450px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>