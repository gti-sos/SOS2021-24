<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
        let imagen1;
        let imagen2;
        let imagen3;
        let cita1;
        let cita2;
        let cita3;
        onMount(loadWiki);
        async function loadWiki(){
            const imagesData = await fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/images?count=3", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
                    "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
                }
            })
            const stepsData = await fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=3", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
                    "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
                }
            })
            const images = await imagesData.json(); 
            const steps = await stepsData.json(); 
            imagen1 = images["1"];
            imagen2 = images["2"];
            imagen3 = images["3"];
            cita1 = steps["1"];
            cita2 = steps["2"];
            cita3 = steps["3"];
        }
        loadWiki();
    </script>
    
    <main>
    
    <br>
    <figure class="figure">
        <img src={imagen1} class="figure-img img-fluid rounded" alt="...">
        <figcaption class="figure-caption text-center">{cita1}</figcaption>
      </figure>
      <figure class="figure">
        <img src={imagen2} class="figure-img img-fluid rounded" alt="...">
        <figcaption class="figure-caption text-center">{cita2}</figcaption>
      </figure>
      <figure class="figure">
        <img src={imagen3} class="figure-img img-fluid rounded" alt="...">
        <figcaption class="figure-caption text-center">{cita3}</figcaption>
      </figure>
      <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
    
    
    
    </main>