<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    let extData = [];
    let countryName = [];
    let countryPopulation = [];
    async function loadChart() {
        const res = await fetch("https://restcountries.eu/rest/v2/lang/es");
        extData = await res.json();
        if (res.ok) {
          extData.forEach((stat) => {
            countryName.push(stat.name);
            countryPopulation.push(stat.population);
          });
        }
    
    console.log(extData);

        Highcharts.chart("container", {
            chart: {
        type: 'lollipop'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Población de países de habla hispana'
    },

    tooltip: {
        shared: true
    },

    xAxis: {
        type: 'category',
        categories: countryName
    },

    yAxis: {
        title: {
            text: 'Población'
        }
    },
          series: [
            {
              name: "Población",
              data: countryPopulation,
              colorByPoint: true
            },
          ],
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
            <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
          </div>
    </main>

<style>
.highcharts-figure{
    min-width: 320px; 
    max-width: 970px;
    margin: 1em auto;
}
    </style>