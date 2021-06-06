<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
        let imagen1;
        let imagen2;
        onMount(loadImg);
        async function loadImg(){
            const imagesData = await fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/images?count=3", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
                    "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
                }
            })
            const images = await imagesData.json();  
            imagen1 = images["1"];
            imagen2 = images["2"];
        }
    </script>
    <main>
        <br>
    <Button color="primary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente Imágen</Button>
    <figure class="figure">
        <img src={imagen1} class="figure-img img-fluid rounded" alt="...">
      </figure>
      <figure class="figure">
        <img src={imagen2} class="figure-img img-fluid rounded" alt="...">
      </figure>
      <br>
      <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
    
    </main>