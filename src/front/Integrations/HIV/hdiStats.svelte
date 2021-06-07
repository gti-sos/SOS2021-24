<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    let extData = [];
    let hdirank = [];
    let hdivalue = [];
    let hdischolar = [];
    async function loadChart() {
        const res = await fetch("https://sos2021-23.herokuapp.com/api/v1/hdi-stats");
        extData = await res.json();
        if (res.ok) {
          extData.forEach((stat) => {
            if(stat.country == "Italy" && stat.year==2017){
            hdirank.push(stat.hdirank);
            hdivalue.push(stat.hdivalue);
            hdischolar.push(stat.hdischolar);
            }
            
          });
        }
    
    console.log(extData);

    Highcharts.chart('container', {
    colorAxis: {
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'Rango',
            value: parseInt(hdirank),
            colorValue: 3
        }, {
            name: 'Valor',
            value: parseInt(hdivalue),
            colorValue: 12
        }, {
            name: 'Escolaridad',
            value: parseInt(hdischolar),
            colorValue: 4
        }]
    }],
    title: {
        text: 'Highcharts Treemap'
    }
});
      }
    </script>
    
    <svelte:head>
<script src="https://code.highcharts.com/highcharts.js"on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/treemap.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
        <div>
            <h1 style="text-align: center;"><strong>Uso API grupo 23 HDI</strong></h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p style="text-align: center;" class="highcharts-description">
                Gráfico Treemap sobre las variables de la API de HDI
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