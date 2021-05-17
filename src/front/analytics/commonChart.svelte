<script>
    import { Button, Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_CONTACT_API_PATH_v2 = "/api/v2";
    let HIVData = [];
    let HIVChartData = [];
    let schoolData = [];
    let schoolChartData = [];
    let employmentData=[];
    let employmentChartData = [];
    var years = [];
    let msg = "";
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
    async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_CONTACT_API_PATH_v2 + "/children-with-hiv");
      const res1 = await fetch(BASE_CONTACT_API_PATH_v2 + "/children-out-school");
      const res2 = await fetch(BASE_CONTACT_API_PATH_v2 + "/children-employment");
      if (res.ok || res1.ok || res2.ok) {
        console.log("procesing school data....");
        if (res1.ok) {
          schoolData = await res1.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctyears1 = distinctRecords(schoolData, "year");
          distinctyears1.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctyears1.forEach((element) => {
            years.push(element.year);
            console.log("years: " + element.year);
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales
         
          years.forEach((e) => {
            var yAxis = schoolData
              .filter((d) => d.year === e)
              .map((dr) => dr["children_out_school_total"])
              .reduce((acc, dr) => dr + acc);
            console.log("YAxis: " + yAxis);
            schoolChartData.push(Math.round(yAxis));
          });
          msg = "";
        }
        console.log("procesing HIV data....");
        if (res.ok) {
          HIVData = await res.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctyears = distinctRecords(HIVData, "year");
          distinctyears.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctyears.forEach((element) => {
            if (!years.includes(element.year)) {
              years.push(element.year);
              console.log("years: " + element.year);
            }
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales
          
          
          //HIVChartData.push("");
          
          years.forEach((e) => {
            var yAxis = HIVData
              .filter((d) => d.year === e)
              .map((nr) => nr["total_infected"])
              .reduce((acc, nr) => nr + acc,0);
            console.log("YAxis: " + yAxis);
            HIVChartData.push(Math.round(yAxis));
            
          });
          msg = "";
        }
        if(res2.ok){
          employmentData = await res2.json();
          console.log("RES2 OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctyears = distinctRecords(employmentData, "year");
          distinctyears.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctyears.forEach((element) => {
            if (!years.includes(element.year)) {
              years.push(element.year);
              console.log("years: " + element.year);
            }
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales         
          years.forEach((e) => {
            var yAxis = employmentData
              .filter((d) => d.year === e)
              .map((qli) => qli["percent_children_employment_t"]*1000)
              .reduce((acc, qli) => qli + acc,0);
            console.log("YAxis: " + yAxis);
            employmentChartData.push(Math.round(yAxis));
            
          });
          msg = "";
        }
      } else {
        console.log("ERROR MSG");
        msg = "Por favor primero cargue los datos en al menos una de las APIs";
      }
      console.log("school Chart DaTa: " + schoolChartData);
      console.log("HIV Chart DaTa: " + HIVChartData);
      console.log("employment Chart Data: " + employmentChartData);
      Highcharts.chart("container", {
        title: {
          text: "Abandono escolar / Niñ@s empleados / Niñ@s con VIH",
        },
        yAxis: {
          title: {
            text: "Ratio",
          },
        },
        xAxis: {
          title: {
            text: "Años",
          },
          categories: years,
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
                point: "year",
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
            name: "Total de niños/as infectadas",
            data: HIVChartData,
          },
          {
            name: "Total de niños/as fuera del colegio",
            data: schoolChartData,
          },
          {
            name: "Total de niños/as empleados",
            data: employmentChartData,
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
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadChart}></script>
  </svelte:head>
  
  <main>

    <div>
      <h1>Gráfica Común</h1>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de líneas básico que muestra la correlación entre el total de 
          niños y niñas que abanandonan la escuela que están infectados por VIH, y que están empleados.
        </p>
      </figure>
    {/if}
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