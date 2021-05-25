<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {pop} from "svelte-spa-router";
   </script>
   
   <main>
       
       <h2>Integraciones del grupo SOS2021-24</h2>
       <body>
        <p>LEYENDA: <Button color= "success">Integrado y con proxy</Button>
        <Button color= "warning">Integrado</Button>
        <Button color= "secondary">PROXY</Button>
        <Button color= "danger">Solo widget</Button></p>
       <p></p>
       <p></p>
       <p></p>
       <h4>Integraciones de Abandono Escolar (Enrique Luque García)</h4>
       <div class="div-home">
           <p><Button color="warning" href="#/integrations/children-out-school/expenditures">Integracíon Education Expenditures</Button></p>
           <h6>Integracion APIs Externas</h6> <Button color="danger" href="#/integrations/children-out-school/digimon">Integracíon Ext. Digimon</Button>
           <Button color="danger" href="#/integrations/children-out-school/yugioh">Integracíon Ext. YU-GI-OH</Button>
           <Button color="secondary" href="#/integrations/children-out-school/quote">Integracíon Ext. Quotes</Button>
           <Button color="danger" href="#/integrations/children-out-school/4">Integracíon Ext. 4</Button>
       </div>
       <br>
       <h4>Integraciones del resto</h4>
   
   </body>
   </main>