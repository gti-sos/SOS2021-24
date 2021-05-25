<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadChart(){
   
    var cards={};
    var cardTypes = [];
    const resData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const myData = await resData.json();  
    console.log(myData);
    
    myData.data.forEach((v) =>{
         if(v.type in cards){
                cards[v.type] += 1;
            }
            else{
                cards[v.type]= 1;
            }
        });
    
    for (var key in cards){
        cardTypes.push([key,cards[key]]);
    }
    
Highcharts.chart('container', {
    chart: {
        renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 15,
            depth: 50,
            viewDistance: 20
        }
    },
    title: {
        text: 'Cartas de Yu-Gi-Oh por tipos'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Número de cartas'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
            depth: 20
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
        series: [{
            name: 'Número de cartas',
            colorByPoint: true,
            data: cardTypes
        }]
    });
}
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/cylinder.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
      Gráfico 3D que muestra la cantidad de cartas de YU-GI-OH por tipos.
  </p>
  </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>

#container {
    height: 600px;
    width: 900px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}

</style>