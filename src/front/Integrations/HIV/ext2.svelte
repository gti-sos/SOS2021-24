<script>
    import {
        onMount
    } from "svelte";
    
    import Button from "sveltestrap/src/Button.svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    
    let extData = [];
    let ruralHospitals = [];
    let urbanHospitals = [];
    let totalHospitals = [];
    async function loadChart() {
        const res = await fetch("https://api.covid19api.com/country/france");
        extData = await res.json();
        if (res.ok) {
          extData.forEach((stat) => {
            if(extData.regional == "state"){
                if("state" == "Andhra Pradesh"){
                    ruralHospitals.push(stat.ruralHospitals);
            urbanHospitals.push(stat.urbanHospitals);
            totalHospitals.push(stat.totalHospitals);
                }
            }
          });
        }else{
            console.log("Error!");
        }
    
    console.log(extData);
        
        dataSource = {
  "chart": {
    "caption": "Split of visitors by Channels & Gender",
    "placevaluesinside": "1",
    "showvalues": "0",
    "plottooltext": "",
    "theme": "fusion"
  },
  "categories": [
    {
      "category": [
        {
          "label": "Hospitales"
        }
      ]
    }
  ],
  "dataset": [
    {
      "seriesname": "Hospitales rurales",
      "data": ruralHospitals
    },
    {
      "seriesname": "Hospitales urbanos",
      "data": urbanHospitals
    },
    {
      "seriesname": "Hospitales totales",
      "data": totalHospitals
    }
  ]
};
    cargarConf();
      }
      onMount(loadChart);
    var chartConfigs={};
    async function cargarConf(){
      chartConfigs = {
        type: 'stackedbar2d',
   width: 600,
   height: 400,
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