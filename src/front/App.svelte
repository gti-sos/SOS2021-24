<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
  import Inicio from './Inicio.svelte'
  import {Collapse,Jumbotron,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'sveltestrap';

  //Imports para APIs
  import SchoolAPI from './schoolGUI/childrenOutSchoolTable.svelte'
  import EditSchool from './schoolGUI/editSchool.svelte'
  import EmploymentAPI from './employmentGUI/childrenEmploymentTable.svelte'
  import EditEmployment from './employmentGUI/editEmployment.svelte'
  import HivAPI from './hivGUI/childrenWithHIVTable.svelte'
  import EditHIV from './hivGUI/editHIV.svelte'

  //Imports para analytics
	import AnalyticsSchool from "./analytics/school/schoolAnalytics.svelte";
  import AnalyticsEmployment from "./analytics/employment/employmentAnalytics.svelte";
  import AnalyticsHIV from "./analytics/HIV/HIVAnalytics.svelte";

  import AnalyticsALL from "./analytics/commonChart.svelte";
  import AnalyticsHub from "./analytics/analyticsHub.svelte"

  //Imports para Integraciones
  import IntegreationsAll from './Integrations/IntegreationsALL.svelte';

  //School
  import IntegrationExpenditures from "./Integrations/school/educationExpenditures.svelte"
  import IntegrationSanity from "./Integrations/school/sanintyStats.svelte"
  import IntegrationDigi from "./Integrations/school/integrationExtDigimon.svelte"
  import IntegracionExt2 from "./Integrations/school/integracionExt2.svelte"
  import IntegracionExt3 from "./Integrations/school/integracionExt3Proxy.svelte"
  import IntegracionExt4 from "./Integrations/school/integracionExt4.svelte"
  import IntegracionExt5 from "./Integrations/school/integracionExt5.svelte"
  import IntegracionObesity from "./Integrations/school/integracionObesity.svelte"
  import IntegracionFood from "./Integrations/school/usoFood.svelte"

  //HIV
  import IntegracionNatality from "./Integrations/HIV/natalityStats.svelte"
  import IntegracionLife from "./Integrations/HIV/lifeStats.svelte"
  import IntegracionHDI from "./Integrations/HIV/hdiStats.svelte"
  import IntegracionMH from "./Integrations/HIV/mhStats.svelte"
  import IntegracionExtPalas from "./Integrations/HIV/palasExt.svelte"
  import IntegracionExtJugadores from "./Integrations/HIV/jugadoresExt.svelte"
  
  

    let isOpen=false;
    
    const routes = {
      "/": Inicio,
		  "/info":Home,
      //===============School===============
      "/children-out-school": SchoolAPI,
      "/children-out-school/:country/:year":EditSchool,
      "/analytics/children-out-school": AnalyticsSchool,
      "/integrations/children-out-school/expenditures": IntegrationExpenditures,
      "/integrations/children-out-school/sanity": IntegrationSanity,
      "/integrations/children-out-school/digimon": IntegrationDigi,
      "/integrations/children-out-school/yugioh": IntegracionExt2,
      "/integrations/children-out-school/quote": IntegracionExt3,
      "/integrations/children-out-school/restcountries": IntegracionExt4,
      "/integrations/children-out-school/btc": IntegracionExt5,
      "/integrations/children-out-school/obesity": IntegracionObesity,
      "/integrations/children-out-school/food": IntegracionFood,
      //==================================


      "/children-employment": EmploymentAPI,
      "/children-employment/:country/:year":EditEmployment,
      "/analytics/children-employment": AnalyticsEmployment,


      //===============HIV===============
      "/children-with-hiv": HivAPI,
      "/children-with-hiv/:country/:year":EditHIV,
      "/analytics/children-with-hiv": AnalyticsHIV,
      "/integrations/children-with-hiv/natality":IntegracionNatality,
      "/integrations/children-with-hiv/life":IntegracionLife,
      "/integrations/children-with-hiv/hdi":IntegracionHDI,
      "/integrations/children-with-hiv/mh":IntegracionMH,
      "/integrations/children-with-hiv/palas":IntegracionExtPalas,
      "/integrations/children-with-hiv/jugadores":IntegracionExtJugadores,


      "/integrations":IntegreationsAll,
      "/analytics/hub":AnalyticsHub,
      "/analytics": AnalyticsALL,
		  '*': NotFound,
    };
</script>

<main>
    <body>
      <Jumbotron style="background-color:mediumpurple;"class="p-3" >
        <h1 style="text-align:center; " class="display-4">SOS2021-24</h1>
      </Jumbotron>
        <Navbar color="dark" dark expand = "md" >
            <NavbarBrand href="#/">SOS2021-24</NavbarBrand>
            <Nav navbar >
              <NavItem>
                <NavLink href="#/info">Info</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/children-out-school">Abandono escolar</NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#/children-employment">Niñ@s empleados</NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#/children-with-hiv">Niños/as con VIH</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href= "#/analytics/hub">Analíticas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href= "#/integrations">Integraciones</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Videos</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    </body>

    <Router {routes}> </Router>
</main>