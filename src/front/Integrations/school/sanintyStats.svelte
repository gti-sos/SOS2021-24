<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

    let Data = [];
    let CountryDateData = [];
    let health = [];
    let doctor = [];
    let hospital = [];
    const BASE_API_PATH = "/api/v2";
    let schoolData = [];
let schoolChartCountryDateData = [];
let schoolChartchildrenOutSchoolMale = [];
let schoolChartchildrenOutSchoolFemale = [];
let schoolChartchildrenOutSchoolTotal = [];

let cyd = [];

    
    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch("https://sanity-integration.herokuapp.com/sanity-stats");
        Data = await res.json();
        if (res.ok) {
            Data.forEach(stat => {
            CountryDateData.push(stat.country+"/"+stat.year);
            health.push(stat["health_expenditure_in_percentage"]);
            doctor.push(stat["doctor_per_1000_habitant"]);
            hospital.push(stat["hospital_bed"]);   
          });
        }
        const res2 = await fetch(BASE_API_PATH + "/children-out-school");
    schoolData = await res2.json();
    if (res2.ok) {
        schoolData.forEach(stat => {
        schoolChartCountryDateData.push(stat.country+"/"+stat.year);
        schoolChartchildrenOutSchoolMale.push(stat["children_out_school_male"]);
        schoolChartchildrenOutSchoolFemale.push(stat["children_out_school_female"]);
        schoolChartchildrenOutSchoolTotal.push(stat["children_out_school_total"]);   
      });
    }
        
        console.log("Sanity chart: " + Data);
        
        Highcharts.chart("container", {
          chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 20,
                depth: 50,
                viewDistance: 60
            }
        },
          title: {
            text: "Número de camas en hospitales",
          },
          yAxis: {
            title: {
              text: "",
            },
          },
          xAxis: {
            title: {
              text: "",
            },
            categories: CountryDateData
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
                  backgroundColor: "gray",
                },
              ],
            },
          ],
         plotOtions: {
            series: {
                depth: 30,
                colorByPoint: false
            }
        },
          series: [
            {
              name: "Número de camas",
              data: hospital,
              colorByPoint: true
            },
            
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 3000,
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
      <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/cylinder.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
        <div>
            <h1 style="text-align: center;">Uso <strong>API Sanity Stats </strong></h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p style="text-align: center;" class="highcharts-description">
                Gráfico 3D que muestra el número de camas en hospitales en varios países y años.
              </p>
            </figure>
            <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
          </div>
    </main>
    
    <style>
      .highcharts-figure {
          min-width: 320px; 
          max-width: 1400px;
          margin: 1em auto;
      }
    </style>