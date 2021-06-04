<script>
    import {pop} from "svelte-spa-router";
    import { Table, ListGroup, ListGroupItem } from 'sveltestrap';
   </script>
   
   <main>
       
       <h2 style="text-align: center;">Integraciones del grupo SOS2021-24</h2>
       <body>
       <p></p>
       <p></p>
       <h4 style="text-align: center;">Integraciones de Abandono Escolar (Enrique Luque García)</h4>
        <Table>
       <h6>Integraciones/Usos APIs Alumnos de SOS</h6>
       <ListGroup>
        <ListGroupItem  color=info href="#/integrations/children-out-school/expenditures" action>Integracíon API grupo 4 Education Expenditures</ListGroupItem>
        <ListGroupItem color=info href="#/integrations/children-out-school/sanity" action>Integracíon API grupo 10 Sanity Stats</ListGroupItem>
        <ListGroupItem color=primary href="#/integrations/children-out-school/obesity" action>Uso API grupo 10 Obesity Stats</ListGroupItem>
        <ListGroupItem color=primary href="#/integrations/children-out-school/food" action>Uso API grupo 10 Food Consumption</ListGroupItem>
        </ListGroup>
        <br>
        <h6>Integraciones/Usos APIs Externas</h6>
        <ListGroup>
            <ListGroupItem id="extapi1" color=dark href="#/integrations/children-out-school/digimon" action>Uso API Ext. Digimon</ListGroupItem>
            <ListGroupItem id="extapi2" color=dark href="#/integrations/children-out-school/yugioh" action>Uso API Ext. YU-GI-OH</ListGroupItem>
            <ListGroupItem id="extapi3" color=secondary href="#/integrations/children-out-school/quote" action>Uso API Ext. Random Quotes</ListGroupItem>
            <ListGroupItem id="extapi4" color=dark href="#/integrations/children-out-school/restcountries" action>Uso API Ext. Restcountries</ListGroupItem>
        </ListGroup>
    </Table>

   
    
       <br>
       <h4 style="text-align: center;">Integraciones de Niñ@s Emplead@s (Fco Javier Macero Vázquez)</h4>
       <Table>
        <h6>Integraciones/Usos APIs Alumnos de SOS</h6>
        <ListGroup>
         <ListGroupItem  color=info href="#/integrations/children-employment/unemployment" action>Integracíon API grupo 23 unemployment-stats</ListGroupItem>
         
         </ListGroup>

        </Table>





       <h4>Integraciones del resto</h4>
   
   </body>
   </main>