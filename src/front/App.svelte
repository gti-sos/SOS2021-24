<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
  import Inicio from './Inicio.svelte'

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

	import {Collapse,Jumbotron,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'sveltestrap';
  

    let isOpen=false;
    
    const routes = {
      "/": Inicio,
		  "/info":Home,
      "/children-out-school": SchoolAPI,
      "/children-out-school/:country/:year":EditSchool,
      "/analytics/children-out-school": AnalyticsSchool,

      "/children-employment": EmploymentAPI,
      "/children-employment/:country/:year":EditEmployment,
      "/analytics/children-employment": AnalyticsEmployment,

      "/children-with-hiv": HivAPI,
      "/children-with-hiv/:country/:year":EditHIV,
      "/analytics/children-with-hiv": AnalyticsHIV,

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
              <Dropdown  nav {isOpen} toggle="{() => isOpen = !isOpen}" >
                <DropdownToggle nav caret>
                  Analíticas
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Gráficas</DropdownItem>
                  <DropdownItem href="#/analytics/children-out-school">Abandono Escolar</DropdownItem>
                  <DropdownItem href="#/analytics/children-employment">Niñ@s emplead@s</DropdownItem>
                  <DropdownItem href="#/analytics/children-with-hiv">Niños/as con VIH</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#/analytics">Todos</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink>Integraciones</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Videos</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    </body>

    <Router {routes}> </Router>
</main>