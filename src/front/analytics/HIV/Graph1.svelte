<script>
  import { onMount } from "svelte";
    
  const BASE_CONTACT_API_PATH = "/api/v2";
  let HIVData = [];
  let HIVChartData = [];
  let HIVChartCountryDateData = [];
  let HIVChartLivingWith = [];
  let HIVChartNewlyInfected = [];
  let HIVChartTotalInfected = [];
  
  
  async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_CONTACT_API_PATH + "/children-with-hiv");
      HIVData = await res.json();
      if (res.ok) {
          HIVData.forEach(stat => {
          HIVChartCountryDateData.push(stat.country+"/"+stat.year);
          HIVChartLivingWith.push(stat["living_with"]);
          HIVChartNewlyInfected.push(stat["newly_infected"]);
          HIVChartTotalInfected.push(stat["total_infected"]);   
        });
      }
      
      console.log("Children with HIV chart: " + HIVChartData);
      Highcharts.chart('container', {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Niños/as con VIH',
    align: 'center'
  },
  subtitle: {
    text: 'Entre 0-14 años',
    align: 'center'
  },
  xAxis: [{
    categories: HIVChartCountryDateData,
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[2]
      }
    },
    title: {
      text: 'Viciendo con VIH',
      style: {
        color: Highcharts.getOptions().colors[2]
      }
    },
    opposite: true

  }, { // Secondary yAxis
    gridLineWidth: 0,
    title: {
      text: 'Nuevos infectados',
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    },
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    }

  }, { // Tertiary yAxis
    gridLineWidth: 0,
    title: {
      text: 'Total de infectados',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 100,
    verticalAlign: 'top',
    y: 55,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      'rgba(255,255,255,0.25)'
  },
  series: [{
    name: 'Total infectados',
    type: 'column',
    yAxis: 1,
    data: HIVChartTotalInfected,
    tooltip: {
      valueSuffix: ''
    }

  }, {
    name: 'Viviendo con VIH',
    type: 'spline',
    yAxis: 2,
    data: HIVChartLivingWith,
    marker: {
      enabled: false
    },
    dashStyle: 'shortdot',
    tooltip: {
      valueSuffix: ''
    }

  }, {
    name: 'Nuevos infectados',
    type: 'spline',
    data: HIVChartNewlyInfected,
    tooltip: {
      valueSuffix: ''
    }
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          floating: false,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: 0,
            y: -6
          },
          showLastLabel: false
        }, {
          labels: {
            align: 'left',
            x: 0,
            y: -6
          },
          showLastLabel: false
        }, {
          visible: false
        }]
      }
    }]
  }
});
    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
  </svelte:head>
  
  <main>
  
      <div>
        <figure class="highcharts-figure">
          <div id="container"></div>
          <p class="highcharts-description">
            Gráfica que muestra los datos relacionados con el VIH en diversos países del mundo para
            niños y niñas de entre 0 y 14 años. 
          </p>
        </figure>
        </div>
  
  </main>
  
  <style>
      main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
      }
      div{
        margin-bottom: 15px;
      }
      p {
        display: inline;
      }
    </style>