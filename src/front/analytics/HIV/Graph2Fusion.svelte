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
  var BASE_CONTACT_API_PATH= "/api/v2";
	const paises = new Set();
	let year = new Set();
	var dicTotalInfectados ={};
	let totalInfectados = [];
	let dataSource ={};
	var dicDateData ={};
	let categoriasAnyos = [];
	
    let data = [];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/children-with-hiv");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
			let i=0;
			data.reverse();
			while(i<data.length){
				year.add(data[i].year);
				if(dicTotalInfectados[data[i].country]){
					dicTotalInfectados[data[i].country].push({"value":  parseInt(data[i].total_infected)});
				}
				else{
					dicTotalInfectados[data[i].country]=[{"value":  parseInt(data[i].total_infected)}];
				}
				if(dicDateData[data[i].country]){
					dicDateData[data[i].country].push(data[i].year);
				}
				else{
					dicDateData[data[i].country]=[parseInt(data[i].year)];
				}
				i++;
			}
			console.log(dicTotalInfectados);
			
			
        }else{
            console.log("Error!");
        }
		let paises= Object.keys(dicTotalInfectados);
		for(let p=0; p<paises.length; p++){
			if(dicDateData[paises[p]]){
				let anyos=dicDateData[paises[p]].sort();
				let a=0;
					while(a<Array.from(year).length){
						let ord =Array.from(year).sort();
						if(!anyos.includes(ord[a])){
							dicTotalInfectados[paises[p]].splice(a, 0, null);
						}
						a++
					}
			}
		}
    
    for(let a=0; a< year.size; a++){
      let anyos= Array.from(year).sort();
      categoriasAnyos.push({"label" : anyos[a].toString()});
    }
   
	  console.log(categoriasAnyos);
		Object.entries(dicTotalInfectados).forEach(([key, value]) => {
			
				totalInfectados.push({"seriesname": key , "data": value})
			});
      console.log(totalInfectados);
    dataSource = {
    "chart": {
      "caption": "Niños/as infectados por VIH",
      "subcaption": "Entre 0-14 años",
      "xaxisname": "País y año",
      "yaxisname": "Infectados",
      "formatnumberscale": "1",
      "plottooltext": "<b>$dataValue</b> infectados en <b>$seriesName</b> en el año $label",
      "theme": "fusion",
      "drawcrossline": "1"
    },
    "categories": [
      {
        "category":categoriasAnyos
      }
    ],
    "dataset": totalInfectados
  };
  console.log("datos cargados")
  cargarConf();
    }  
    onMount(getData);
    var chartConfigs={};
    async function cargarConf(){
      chartConfigs = {
     
        type: 'mscolumn2d',
        width: 1300,  
        height: 600,
        dataFormat: 'json',
        dataSource
      };
    }
    
    
  
  
  </script>
  <main>
    <Button outline color="secondary" onclick="window.location.href='#/children-with-hiv'">Volver</Button>
    <div style="margin:auto;"> 
      <SvelteFC {...chartConfigs}/>
      
    </div>
   
  </main>