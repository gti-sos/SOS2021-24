<script>
  var errorMsg = "";
var data01 = [];
const BASE_API_URL_01 = "/api/v2/unemployment-stats"
//INTEGRACION Unemployment stats
async function loadAPI() {
    console.log("Loading data...");
   
    const res = await fetch(BASE_API_URL_01).then(
      function (res) {
        if (res.ok) {
          errorMsg = "";
          console.log("OK");
        } else {
          if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          console.log("ERROR!" + errorMsg);
        }
      }
    );
  }
  
  async function getData01() {
    console.log("Fetching data...");
    await loadAPI();
    const res = await fetch(BASE_API_URL_01);
    if (res.ok) {
      const json = await res.json();
      data01 = json;
  
      console.log(`We have received ${data01.length} stats.`);
      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos";
      console.log("ERROR!" + errorMsg);
    }
  }
  async function loadChart(){
    await getData01();
    var paises = [];
    var porcentaje = [] ;
    
    data01.forEach((d) => {
        paises.push(d.country);
        porcentaje.push(d.knoperc);
        
    });

    


    var data = [{
            values: porcentaje,
            labels: paises,
            type: 'pie'
        }];
        var layout = {
            height: 400,
            width: 1300
            };
        Plotly.newPlot('myDiv', data, layout);
    }
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>
</svelte:head>


<main> 
            
    
  
    <h3>Uso de API Unemployment</h3>
    <h5>Se han recogido los porcentajes sobre el desempleo en diferentes paises</h5> 
    <p>Pie chart</p>
    <body>
        <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    </body>
    {#if errorMsg}
      <p>{errorMsg}</p>
    {/if}
  </main>
  
    
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>