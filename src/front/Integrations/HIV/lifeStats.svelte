<script>
    import {
        onMount
    } from "svelte";
    
    import Button from "sveltestrap/src/Button.svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    
    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    var dataSource = {};
    let Quality = 0;
	let Purchasing = 0;
    let Safety = 0;
    let data = [];
    let data2=[];
    let LivingWith=0;
    let NewlyInfected=0;
    let TotalInfected=0;
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/france/2018");
        const res2 = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-with-hiv/France/2018");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data.push(json);
            data2.push(json2);
            console.log(`We have received ${data.length} data points.`);
			let i=0;
            let e=0;
			while(e<data2.length){
                LivingWith=data2[e].living_with;
                NewlyInfected=data2[e].newly_infected;
                TotalInfected=data2[e].total_infected;
                e++;
            }
			while(i<data.length){
                    Quality = data[i].quality_life_index;
                    Purchasing = data[i].purchasing_power_index;
                    Safety = data[i].safety_index;	
                    i++;			
                
			}
            console.log(Quality);
            
            
        }else{
            console.log("Error!");
        }
        dataSource = {
      "chart": {
        "caption": "Integración con calidad de vida en Francia/2018",
        "plottooltext": "<b>$dataValue</b> $label ",
        "showlegend": "1",
        "showpercentvalues": "1",
        "legendposition": "bottom",
        "usedataplotcolorforlabels": "1",
        "theme": "fusion"
      },
      "data": [
            {
            "label": "Indice de calidad de vida",
            "value": Quality
            },
            {
            "label": "Indice de poder adquisitivo",
            "value": Purchasing
            },
            {
            "label": "Indice de seguridad",
            "value": Safety
            },
            {
            "label": "Niños viviendo con VIH",
            "value": LivingWith
            },
            {
            "label": "Nuevos infectados por VIH",
            "value": NewlyInfected
            },
            {
            "label": "Total de infectados",
            "value": TotalInfected
            }
            ]
    };
        cargarConf();
    }   
    
    onMount(getData);
    var chartConfigs={};
    async function cargarConf(){
        chartConfigs={
            type: 'pie2d',
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