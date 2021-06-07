<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    let extData = [];
    let stateName = [];
    let Cases = [];
    let urlproxy = "/proxy"
    async function loadChart() {
        const res = await fetch(urlproxy + "/v2/states");
        extData = await res.json();
        if (res.ok) {
          extData.forEach((stat) => {
            stateName.push(stat.state);
            Cases.push(stat.cases);
          });
        }
    
    console.log(extData);

    Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Stacked bar chart'
    },
    xAxis: {
        categories: stateName
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Casos',
        data: Cases
    }]
});
      }
    </script>
    
    <svelte:head>
<script src="https://code.highcharts.com/highcharts.js"on:load={loadChart}></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
<script src="https://code.highcharts.com/modules/lollipop.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
        <div>
            <h1 style="text-align: center;"><strong>Uso API Ext. Restcountries</strong></h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p style="text-align: center;" class="highcharts-description">
                Gráfico lollipop que muestra la cantidad de habitantes en los países de habla hispana.
              </p>
            </figure>
            <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
          </div>
    </main>

<style>
.highcharts-figure{
    min-width: 320px; 
    max-width: 970px;
    margin: 1em auto;
}
    </style>