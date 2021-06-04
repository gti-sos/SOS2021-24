<!-- Hecho con morris-->

<script type="text/javascript">
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadGraph(){
     
        let datos = [];
        let cos_total = [];
        var dic = {};
        const resData = await fetch("/api/v2/children-out-school");
        const json = await resData.json();
        json.forEach( (v) => {
             if(v.year in dic){
              dic[v.year] += Math.round(v.children_out_school_total)
            }
            else{
              dic[v.year]= v.children_out_school_total;
            }  
        });
        console.log(dic);
        for(var v in dic){
             datos.push({
                label: v,
                value: dic[v]
            })
        }
        console.log(datos);
        new Morris.Donut({
            element: 'donutChart',
            data: datos,
            colors: ["#3c8dbc", "red", "#A9DFBF", "yellow", "#9a32cd", "black", "#138D75", "#CE7D7D"] 
        });
    }
    </script>
    
    <svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    </svelte:head>
    <h2 style="text-align: center">Abandono escolar Total por año (2011 - 2017)</h2>
    
    <div id="donutChart" style="height: 300px;"></div>
    <p></p>
    <p></p>
    <h6 style="text-align: center">Gráfica diseñada con Morris.js</h6>