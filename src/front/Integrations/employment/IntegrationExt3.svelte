<script>
  let extData = [];
  let extData2 = [];
  let countryName = [];
  let areas = [];
  let porcentajeEmpleados = [];
  
  async function loadChart() {
      const res = await fetch("https://restcountries.eu/rest/v2/all");
      extData = await res.json();
      if (res.ok) {
        extData.forEach((stat) => {
            if(stat.name == "Argentina"){
              countryName.push(stat.name);
              areas.push(stat.area);

            }
            else if(stat.name == "Cameroon"){
              countryName.push(stat.name);
              areas.push(stat.area);
            }

            else if(stat.name == "Brazil"){
              countryName.push(stat.name);
              areas.push(stat.area);
            }
            else if(stat.name == "Jamaica"){
              countryName.push(stat.name);
              areas.push(stat.area);
            }
            else if(stat.name == "Peru"){
              countryName.push(stat.name);
              areas.push(stat.area);
            }
            else if(stat.name == "Pakistan"){
              countryName.push(stat.name);
              areas.push(stat.area);
            }
          
        });
      }
      const res1 = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-employment");
      extData2 = await res1.json();
      extData2.forEach((stat) => {
        if(stat.country == "Argentina"){
          porcentajeEmpleados.push(stat["percent_children_employment_t"]);
          
        }
        else if(stat.country == "cameroon"){
              
              porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }

            else if(stat.country == "Brazil"){
              
              porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }
            else if(stat.country == "jamaica"){
              
              porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }
            else if(stat.country == "peru"){
              
              porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }
            else if(stat.country == "pakistan"){
              
              porcentajeEmpleados.push(stat["percent_children_employment_t"]);
            }
      });
  
  console.log(countryName);
  console.log(areas);
  console.log(porcentajeEmpleados);

  

  var trace1 = {
  type: 'scatter',
  x: areas,
  y: countryName,
  mode: 'markers',
  name: 'Area del país',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};
var trace2 = {
  type: 'scatter',
  x: porcentajeEmpleados,
  y: countryName,
  mode: 'markers',
  name: 'Porcentaje total de niños empleados en el país',
  marker: {
    color: 'red',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};



var data = [trace1, trace2];

var layout = {
  title: 'Si desea ver mejor alguna de las dos opciones que se comparan pulse en ella',
  xaxis: {
    showgrid: false,
    showline: true,
    linecolor: 'rgb(102, 102, 102)',
    titlefont: {
      font: {
        color: 'rgb(204, 204, 204)'
      }
    },
    tickfont: {
      font: {
        color: 'rgb(102, 102, 102)'
      }
    },
    autotick: false,
    dtick: 10,
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  margin: {
    l: 140,
    r: 40,
    b: 50,
    t: 80
  },
  legend: {
    font: {
      size: 10,
    },
    yanchor: 'middle',
    xanchor: 'right'
  },
  width: 1000,
  height: 1000,
  paper_bgcolor: 'rgb(254, 247, 234)',
  plot_bgcolor: 'rgb(254, 247, 234)',
  hovermode: 'closest'
};

Plotly.newPlot('myDiv', data, layout);
  }
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>
</svelte:head>
    

<main>
    <h3>Integración de API externa del Area de distintos paises</h3>
    <h5>Se recogen los datos para los mismos paises, y se compara el porcentaje total de niños empleados y el área del país</h5> 
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