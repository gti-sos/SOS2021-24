<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
  import Inicio from './Inicio.svelte'
  import SchoolAPI from './schoolGUI/childrenOutSchoolTable.svelte'
  import EditSchool from './schoolGUI/editSchool.svelte'
  import EmploymentAPI from './employmentAPI/childrenEmploymentTable.svelte'
  import EditEmployment from './employmentGUI/editEmployment.svelte';
  import HivAPI from './hivAPI/childrenWithHIVTable.svelte'
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
  

    let isOpen=false;
    
    const routes = {
      "/": Inicio,
		  "/info":Home,
        "/children-out-school": SchoolAPI,
        "/children-out-school/:country/:year":EditSchool,
        "/children-employment": EmploymentAPI,
        "/children-employment/:country/:year":EditEmployment,
        "/children-with-hiv": HivAPI,
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
            </Nav>
        </Navbar>
    </body>

    <Router {routes}> </Router>
</main>