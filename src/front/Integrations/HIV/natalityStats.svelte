<script>
	import FusionCharts from 'fusioncharts';
  	import Charts from 'fusioncharts/fusioncharts.charts';
  	import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  	import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  	import {
        onMount
    } from "svelte";
	import Button from "sveltestrap/src/Button.svelte";
	
	// Always set FusionCharts as the first parameter
	fcRoot(FusionCharts, Charts, FusionTheme);

	let Data = [];
    let CountryDateData = [];
    let Born = [];
    let HIVData = [];
	let HIVChartCountryDateData = [];
	let HIVChartTotalInfected = [];
	


	async function getData() {
		console.log("Fetching data...");
        const res = await fetch("https://sos2021-natality-stats.herokuapp.com/api/v2/natality-stats?country=moldova&date=2018");
        Data = await res.json();
        if (res.ok) {
            Data.forEach(stat => {
				Born.push(stat["born"]); 
          });
        }
        const res2 = await fetch("api/v2/children-with-hiv?country=Moldova&year=2018");
    	HIVData = await res2.json();
    	if (res2.ok) {
        	HIVData.forEach(stat => {
				HIVChartTotalInfected.push(stat["total_infected"]); 
      		});
    	}
        
	Highcharts.chart('container', {
    chart: {
        type: 'columnpyramid'
    },
    title: {
        text: 'The 5 highest pyramids in the World'
    },
    colors: ['#C79D6D', '#B5927B'],
    xAxis: {
        crosshair: true,
        labels: {
            style: {
                fontSize: '14px'
            }
        },
        type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de personas'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    series: [{
        name: 'Total',
        data: [
            ['Niños/as infectados en Etiopía',parseInt(HIVChartTotalInfected)],
            ['Niños/as recien nacidos',parseInt(Born)],
        ],
    },
]
});
	}
	</script>
	<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"on:load={getData}></script>
	<script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	</svelte:head>
	
	<main>
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			Niños y cosas
		</p>
	</figure>
	</main>