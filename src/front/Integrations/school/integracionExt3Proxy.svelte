<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let Quote = [];

	async function loadGraph(){
        console.log("");	
		const res = await fetch("/random");  //Piped proxy
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            Quote = json;
		} else {
			console.log("ERROR!");
        }
        let frase = Quote.content;
    
        var text = frase;
        var lines = text.split(/[,\. ]+/g),
        data = Highcharts.reduce(lines, function (arr, word) {
            var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
            });
            if (obj) {
            obj.weight += 1;
            } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
            }
            return arr;
        }, []);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Valor'
            }],
            title: {
                text: 'Frases célebres'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          {Quote.content}<br> - {Quote.author}
        </p>
    </figure>
    <Button color="primary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente frase</Button>

    <br>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
    .highcharts-figure {
        min-width: 320px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style>