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
       <h6>Integraciones/Usos APIs Alumnos de SOS</h6>
       <ListGroup>
        <ListGroupItem id="school1" color=info href="#/integrations/children-out-school/expenditures" action>Integracíon API grupo 4 Education Expenditures</ListGroupItem>
        <ListGroupItem id="school2" color=primary href="#/integrations/children-out-school/sanity" action>Uso API grupo 10 Sanity Stats</ListGroupItem>
        <ListGroupItem id="school3" color=primary href="#/integrations/children-out-school/obesity" action>Uso API grupo 10 Obesity Stats</ListGroupItem>
        <ListGroupItem id="school4" color=primary href="#/integrations/children-out-school/food" action>Uso API grupo 10 Food Consumption</ListGroupItem>
        </ListGroup>
        <br>
        <h6>Integraciones/Usos APIs Externas</h6>
        <ListGroup>
            <ListGroupItem id="extapi1" color=dark href="#/integrations/children-out-school/digimon" action>Uso API Ext. Digimon</ListGroupItem>
            <ListGroupItem id="extapi2" color=dark href="#/integrations/children-out-school/yugioh" action>Uso API Ext. YU-GI-OH</ListGroupItem>
            <ListGroupItem id="extapi3" color=secondary href="#/integrations/children-out-school/quote" action>Uso API Ext. Random Quotes</ListGroupItem>
            <ListGroupItem id="extapi4" color=dark href="#/integrations/children-out-school/restcountries" action>Uso API Ext. Restcountries</ListGroupItem>
        </ListGroup>
 
    <h4 style="text-align: center;">Integraciones de Niños/as con VIH (Juan Ignacio Roldán Torres)</h4>
        <Table>
       <h6>Integraciones/Usos APIs Alumnos de SOS</h6>
       <ListGroup>
        <ListGroupItem color=primary href="#/integrations/children-with-hiv/natality" action>Integración API grupo 1 Natality Stats</ListGroupItem>
        <ListGroupItem color=primary href="#/integrations/children-with-hiv/life" action>API grupo 1 Life Stats</ListGroupItem>
        <ListGroupItem color=primary href="#/integrations/children-with-hiv/hdi" action>API grupo 23 HDI Stats</ListGroupItem>
        <ListGroupItem color=primary href="#/integrations/children-with-hiv/mh" action>API grupo 23 Mental Health Consumption</ListGroupItem>
        </ListGroup>
        <br>
        <h6>Integraciones/Usos APIs Externas</h6>
        <ListGroup>
            <ListGroupItem id="externalapi1" color=dark href="#/integrations/children-with-hiv/palas" action>Uso API Ext. Palas de pádel</ListGroupItem>
            <ListGroupItem id="externalapi2" color=dark href="#/integrations/children-with-hiv/jugadores" action>Uso API Ext. Jugadores de pádel</ListGroupItem>
        </ListGroup>
    </Table>


   
    
       <br>
       <h4 style="text-align: center;">Integraciones de Niñ@s Emplead@s (Fco Javier Macero Vázquez)</h4>
       <Table>
        <h6>Integraciones/Usos APIs Alumnos de SOS</h6>
        <ListGroup>
         <ListGroupItem  color=info href="#/integrations/children-employment/unemployment" action>Uso API grupo 23 unemployment-stats</ListGroupItem>
         <ListGroupItem  color=info href="#/integrations/children-employment/divorce" action>Integracíon API grupo 01 divorce-stats</ListGroupItem>
         <ListGroupItem  color=info href="#/integrations/children-employment/Poverty" action>Integracíon API grupo 04 Poverty-Risk</ListGroupItem>
         <ListGroupItem  color=info href="#/integrations/children-employment/Plataform" action>Integracíon API grupo 28 Plataform</ListGroupItem>
         
         </ListGroup>
         <br>
        <h6>Integraciones/Usos APIs Externas</h6>
        <ListGroup>
            
            <ListGroupItem id="extApi1" color=dark href="#/integrations/children-employment/Poblacion" action>Uso API Ext. Poblacion de países</ListGroupItem>
            <ListGroupItem id="extApi2" color=dark href="#/integrations/children-employment/Casas" action>Uso API Ext. Casas</ListGroupItem>
                
        </ListGroup>
        </Table>





       <h4>Integraciones del resto</h4>


   
   </body>
   </main>