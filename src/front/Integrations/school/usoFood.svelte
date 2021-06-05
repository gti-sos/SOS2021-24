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
            text: 'Pais/Año'
        },
        labels: {
            format: '{value}'
        },
        maxPadding: 0.05,
        categories: ChartCountryDateData,
    },
    yAxis: {
        title: {
            text: 'Valor'
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
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
            <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
          </div>
    </main>

    <style>
        .highcharts-figure{
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}
    </style>