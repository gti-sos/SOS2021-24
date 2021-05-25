<script>
  import {pop} from "svelte-spa-router";
  import {Button} from "sveltestrap"
  import MyGraph from "./Graph1.svelte";
  import MyGraph2 from "./Graph2Morris.svelte";
  </script>
  <main>
      <h1> Gráficas</h1>
      <MyGraph> </MyGraph>
      <MyGraph2></MyGraph2>

      <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
  </main>