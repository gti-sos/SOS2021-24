<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadChart(){
        var digimons={};
        const res2Data = await fetch("https://digimon-api.herokuapp.com/api/digimon");

        const extData = await res2Data.json();  
        console.log(extData);
        var clasesDigimons = [];
        extData.forEach((v) => {
            if(v.level in digimons){
                digimons[v.level] += 1;
            }
            else{
                digimons[v.level]= 1;
            }
        });
        for (var key in digimons) {
        // check if the property/key is defined in the object itself, not in parent
            clasesDigimons.push([key,digimons[key]]);
        }

        //Ordenamos en función del valor no de la key
        clasesDigimons.sort(function(a, b) {
            return a[1] - b[1];
        });

    Highcharts.chart('container', {
        chart: {
            type: 'pyramid'
        },
    title: {
        text: 'Uso API Ext. Digimon'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                softConnector: true
            },
            center: ['50%', '50%'],
            width: '60%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Digimons',
        data: clasesDigimons
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        dataLabels: {
                            inside: true
                        },
                        center: ['50%', '50%'],
                        width: '100%'
                    }
                }
            }
        }]
    }
});
    }
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
    <script src="https://code.highcharts.com/modules/funnel.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p style="text-align: center;" class="highcharts-description">
            Gráfico piramidal que muestra la cantidad de Digimons segun su nivel.
        </p>
    </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Volver</Button>
</main>
<style>
    .highcharts-figure {
    min-width: 320px; 
    max-width: 1000px;
    margin: 1em auto;
    height: 800px;
}

</style>