<script>
    import {
        onMount
    } from "svelte";
    
    import Button from "sveltestrap/src/Button.svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

    fcRoot(FusionCharts, Charts, FusionTheme);
    
    var dataSource={}
   let Regiones =[];
   let muertes=[];
   let hospitalizedWithSymptoms=[];
   let newCases=[];
   async function loadChart(){
       console.log("Fetching data...");
       const res = await fetch("https://disease.sh/v2/gov/Italy");
       if(res.ok){
           console.log("Ok.");
           const json = await res.json();
           let i =0;
           muertes.push({value: null});
           while(i<json.length){
               if(json[i].region == "Toscana" || json[i].region == "Lazio" ||json[i].region == "Sardegna" ||json[i].region == "Piemonte"){
                Regiones.push({label: json[i].region})
                muertes.push({value: json[i].deaths});
                hospitalizedWithSymptoms.push({value: json[i].hospitalizedWithSymptoms})
                newCases.push({value: json[i].newCases})
               }
               i++;
           }
          
           
       }else{
           console.log("Error!");
       }
        
    dataSource = {
  "chart": {
    "caption": "Twitter Mentions",
    "yaxisname": "Number of mentions",
    "numbersuffix": "M",
    "subcaption": "(iPhone Vs Samsung)",
    "yaxismaxvalue": "2",
    "plottooltext": "$seriesName was mentioned <b>$dataValue</b> times on Twitter in $label",
    "theme": "fusion"
  },
  "categories": [
    {
      "category": Regiones
    }
  ],
  "dataset": [
    {
      "seriesname": "Hospitalizados con síntomas",
      "data": hospitalizedWithSymptoms
    },
    {
      "seriesname": "Nuevos casos",
      "data": newCases
    },
    {
      "seriesname": "Muertes",
      "data": muertes
    }
  ]
};
    cargarConf();
      }
      onMount(loadChart);
    var chartConfigs={};
    async function cargarConf(){
      chartConfigs = {
        type: 'mssplinearea',
   width: 600,
   height: 400,
   dataFormat: 'json',
   dataSource
    };
  }
    </script>
    <main>
        <Button outline color="secondary" onclick="window.location.href='#/integrations'">Volver</Button>
        <div style="margin:auto;"> 
          <SvelteFC {...chartConfigs}/>
          
        </div>
       
    </main>