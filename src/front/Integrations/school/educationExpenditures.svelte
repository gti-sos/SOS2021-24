<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
    async function loadChart(){
        var myDataTrans={
            name: 'Abandono escolar (Total)',
            data: []
        };
        var extDataTrans={
            name: 'Gasto escolar por millones(€)',
            data: []
        };
        var allData =[];
        const resData = await fetch("/api/v2/children-out-school");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://education-expenditures.herokuapp.com/api/v1");
        const extData = await res2Data.json();  
        MyData.forEach((v) => {
        myDataTrans['data'].push({
            name:v.country  + " " +v.year,
            value: v.children_out_school_total
            });
        });

        extData.forEach((v) => {
        extDataTrans['data'].push({
            name: v.country + " " + v.year,
            value: v.education_expenditure_per_millions
            });
        });
        
        allData.push(myDataTrans);
        allData.push(extDataTrans);
        
        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '85%'
        },
        title: {
            text: 'Abandono escolar y Gasto en educación por millones de euros.'
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '70%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.15,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 200
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: allData
    });
}
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>



<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Esta grafica muestra el total de niños y niñas que abandona la escuela y el gasto en educación por millones de euros en los últimos años.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
    

</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
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
</style>