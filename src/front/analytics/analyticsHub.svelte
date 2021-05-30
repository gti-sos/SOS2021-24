<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
   </script>
   
   <main>
       <h2>Analíticas del grupo SOS2021-24</h2>
       <body>
           <Button color="dark" href="#/analytics/children-out-school">Abandono escolar</Button>
           <Button color="info" href="#/analytics/children-employment">Niños/as Empleados</Button>
           <Button color="secondary" href="#/analytics/children-with-hiv">Niños/as con VIH</Button>
           <Button color="primary" href="#/analytics">Gráfica Común</Button>
   </body>
   </main>