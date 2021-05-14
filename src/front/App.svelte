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

  import AnalyticsAll from "./analytics/analyticsAll.svelte";

	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
  

    let isOpen=false;
    
    const routes = {
      "/": Inicio,
		  "/info":Home,
      "/children-out-school": SchoolAPI,
      "/children-out-school/:country/:year":EditSchool,
      "/analytics/children-out-school": AnalyticsSchool,

      "/children-employment": EmploymentAPI,
      "/children-employment/:country/:year":EditEmployment,

      "/children-with-hiv": HivAPI,
      "/children-with-hiv/:country/:year":EditHIV,

      "/analytics": AnalyticsAll,
		  '*': NotFound,
    };
</script>

<main>

    <body >
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

                  <DropdownItem divider />
                  <DropdownItem href="#/analytics">Todos</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
        </Navbar>
    </body>

    <Router {routes}> </Router>
</main>