<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadChart(){
        var proporcionDigimons={};
        const res2Data = await fetch("https://digimon-api.herokuapp.com/api/digimon");
        const extData = await res2Data.json();  
        console.log(extData);
        var clasesDigimons = [];
        extData.forEach((v) => {
            if(v.level in proporcionDigimons){
                proporcionDigimons[v.level] += 1;
            }
            else{
                proporcionDigimons[v.level]= 1;
            }
        });
        for (var key in proporcionDigimons) {
        // check if the property/key is defined in the object itself, not in parent
            clasesDigimons.push([key,proporcionDigimons[key]]);
        }

        Highcharts.chart('container', {
    chart: {
        type: 'pyramid3d',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50
        }
    },
    title: {
        text: 'Highcharts Pyramid3D Chart'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                allowOverlap: true,
                x: 10,
                y: -5
            },
            width: '60%',
            height: '80%',
            center: ['50%', '45%']
        }
    },
    series: [{
        name: 'Digimons',
        data: clasesDigimons
    }]
});
    }
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/cylinder.js"></script>
<script src="https://code.highcharts.com/modules/funnel3d.js"></script>
<script src="https://code.highcharts.com/modules/pyramid3d.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico pirámide 3D que muestra la cantidad de Digimons segun su nivel.
        </p>
    </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Volver</Button>
</main>
<style>
    .highcharts-figure {
    min-width: 320px; 
    max-width: 660px;
    margin: 1em auto;
}

</style>