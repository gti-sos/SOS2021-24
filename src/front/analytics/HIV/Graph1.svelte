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
        Highcharts.chart("container", {
          title: {
            text: "Niños/as con VIH",
          },
          yAxis: {
            title: {
              text: "Valor",
            },
          },
          xAxis: {
            title: {
              text: "País/Año",
            },
            categories: HIVChartCountryDateData,
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
          },
          annotations: [
            {
              labels: [
                {
                  point: "date",
                  text: "",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "white",
                },
              ],
            },
          ],
          series: [
            {
              name: "Viviendo con VIH",
              data: HIVChartLivingWith,
            },
            {
              name: "Nuevos infectados",
              data: HIVChartNewlyInfected,
            },
            {
              name: "Total de infectados",
              data: HIVChartTotalInfected,
            }
            
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom",
                  },
                },
              },
            ],
          },
        });
      }
    </script>
    <svelte:head>
      <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
      <script src="https://code.highcharts.com/modules/series-label.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script
        src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
    
        <div>
            <h1 style="text-align: center;">Analítica <strong>(Niños/as con VIH)</strong></h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p class="highcharts-description">
                Gráfico de líneas básico que muestra los diferentes valores de miños y niñas con VIH en varios países.
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