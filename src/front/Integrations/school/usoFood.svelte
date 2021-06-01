<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
    let Data = [];
    let ChartCountryDateData = [];
    let calory = [];
    let gram = [];
    let dailyg = [];
    let dailycal = [];

    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch("https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats");
        Data = await res.json();
        if (res.ok) {
            Data.forEach(stat => {
            ChartCountryDateData.push(stat.country+"/"+stat.year);
            calory.push(stat["caloryperperson"]);
            gram.push(stat["gramperperson"]);
            dailyg.push(stat["dailygram"]); 
            dailycal.push(stat["dailycalory"]);    
          });
        }
        
    console.log("chart: " + Data);
        
    Highcharts.chart("container", {
        chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Estadísticas de consumo de comida'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Número de camas'
        },
        labels: {
            format: '{value}'
        },
        accessibility: {
            rangeDescription: 'Range: 0 to 80 km.'
        },
        maxPadding: 0.05,
        showLastLabel: true,
        categories: ChartCountryDateData,
    },
    yAxis: {
        title: {
            text: 'Valor'
        },
        labels: {
            format: '{value}'
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y}'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
            name: 'Calorías por persona',
            data: calory,
            color: "#7DCEA0"
        },{
          name: "Gramos por persona",
          data: gram,
          color: "#3c8dbc"
        }
        ,{
          name: "Calorías diarías",
          data: dailycal,
          color: "#EC7063"
        },{
          name: "Gramos diarios",
          data: dailyg,
          color: "purple"
        }
    ]
});
      }
    </script>
    <svelte:head>
      <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
        <div>
            <h1 style="text-align: center;">Uso API FoodConsumption Stats</h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p style="text-align: center;" class="highcharts-description">
                Gráfico spiline que muestra distintas estadísticas de consumo de comida en varios países y años.
              </p>
            </figure>
            <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
          </div>
    </main>

    <style>
        .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
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