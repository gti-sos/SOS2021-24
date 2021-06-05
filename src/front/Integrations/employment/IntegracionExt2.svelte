<script>
  async function loadChart(){
    const raw_data1 = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-employment");
    const raw_data2 = await fetch("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/t20/p274/serie/prov/p02/02006.px?tip=AM", {
	"method": "GET"
  });
  let data = await raw_data1.json();
  let data2 = await raw_data2.json();
  console.log(data2);


  let country_year = Array.from(new Set(data.map((d) => {return d.country+" "+d.year;})));
  let empl_t = Array.from(new Set(data.map((d) => {return d["percent_children_employment_t"];})));

  let casas = [];
    let valor = [];
    
    for(var i = 9; i<18; i++){
        let obj = data2[i]["Nombre"];
        casas[i-9] = obj;
        valor[i-9] = data2[i]["Data"][0]["Valor"];
    }
    console.log("Casas "+casas);
    console.log("Valor "+valor);
    let casas_countries = casas.concat(country_year);
     var salto = [];
    for(var i = 0; i<casas.length;i++){
        salto[i] = 0;
    }
    let sal_emp = valor.concat(empl_t);

    var gd = document.getElementById('myDiv');
    var datas = [{type: 'funnel', y: casas_countries, x: sal_emp, hoverinfo: 'x+percent previous+percent initial'}];

    var layout = {margin: {l: 500}, width:1600, height: 1000}

    Plotly.newPlot('myDiv', datas, layout);


}
</script>
<svelte:head>
  <script src='https://cdn.plot.ly/plotly-2.0.0-rc.3.min.js'on:load={loadChart}></script>
</svelte:head>
    

<main>
    <h3>Integración de API externa que muestra el numero de hogares con una superficie menor a 46m2 en el que viven un numero de personas</h3>
    <h5>Mostramos el porcentaje de niños empleados y número de hogares con una superficie menor a 46m2</h5> 
    <body>
        <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    </body>
    
</main>

<style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>
