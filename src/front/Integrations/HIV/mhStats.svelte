<script>
    import {
        onMount
    } from "svelte";
    
    import Button from "sveltestrap/src/Button.svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    
    const paises = new Set()
    var dataSource={};
    let MHChartAnxdaly = [];
	  let MHChartBipolar = [];
	  let arrPaises =[];
    let data = [];
    var dict ={};
    let categorias=[];
    let data2=[];
    let LivingWith=[];
    let NewlyInfected=[];
    var BASE_CONTACT_API_PATH= "/api/v2";
    console.log("Fetching data...");
        
    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    async function getData(){
      const res = await fetch("https://sos2021-23.herokuapp.com/api/v1/mh-stats?year=2017");
      const res2 = await fetch(BASE_CONTACT_API_PATH + "/children-with-hiv?year=2017");
        
        if(res.ok){
          console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
			let i=0;
            let e=0;
			while(e<data2.length){
                paises.add(data2[e].country);    
                e++;
            }
			while(i<data.length){
				paises.add(data[i].country);
				i++;
			
			}
      arrPaises = Array.from(paises);
            console.log(dict);
            for(let p=0; p<arrPaises.length;p++ ){
                if(!dict[arrPaises[p]]){
                    dict[arrPaises[p]]={LivingWith : null, NewlyInfected: null, MHChartAnxdaly:null, MHChartBipolar:null}
                }
                console.log(dict);
            }
           
                let d=0;
                let d2=0;
                let paisesd = Object.keys(dict);
                
                    
                    while(d<data.length){
                    console.log(paisesd.includes(data[d].country));
                    if(paisesd.includes(data[d].country)){
                        
                        dict[data[d].country]['bipolar']=data[d].bipolar;
                        dict[data[d].country]['anxdaly']=data[d].anxdaly
                    }
                    d++
                }
                while(d2<data2.length){
                    if(paisesd.includes(data2[d2].country)){
                        
                        dict[data2[d2].country]['living_with']=data2[d2].living_with;
                        dict[data2[d2].country]['newly_infected']=data2[d2].newly_infected;
                        
                        
                    }
                    d2++;  
                }
                for(let p=0; p<paisesd.length; p++){
                    MHChartAnxdaly.push({value: dict[paisesd[p]]['anxdaly']});
				            MHChartBipolar.push({value:dict[paisesd[p]]['bipolar']});
                    LivingWith.push({value: dict[paisesd[p]]['living_with']});
                    NewlyInfected.push({value: dict[paisesd[p]]['newly_infected']});
                  
                }
                console.log(LivingWith);
                let ddds=0;
                console.log(arrPaises.length);
        
                while(ddds<arrPaises.length){
                  
                  categorias.push({label: arrPaises[ddds]});
                  ddds++;
                }
                console.log(categorias);
               
        }else{
            console.log("Error!");
        }
        
        dataSource = {
      "chart": {
        "caption": "Integración con enfermedades mentales",
        "yaxisname": "Nº de personas",
        "subcaption": "Datos de 2017",
        "drawcrossline": "1",
        "numbersuffix": "",
        "plottooltext": "$dataValue $seriesName en $label",
        "theme": "fusion"
      },
      "categories": [
        {
          "category": categorias
          
        }
      ],
      "dataset": [
        {
          "seriesname": "Afectados con ansiedad",
          "data": MHChartAnxdaly
        },
        {
          "seriesname": "Afectados con bipolaridad",
          "data": MHChartBipolar
        },
        {
          "seriesname": "Niños viviendo con VIH",
          "data": LivingWith
        },
        {
          "seriesname": "Nuevos infectados por VIH",
          "data": NewlyInfected
        }
      ]
    };
    cargarConf();
      }
      onMount(getData);
    var chartConfigs={};
    async function cargarConf(){
      chartConfigs = {
        type: 'msarea',
        width: 1200,
        height: 500,
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