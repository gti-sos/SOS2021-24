<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
    import SchoolAPI from './childrenOutSchoolTable.svelte'
    import EmploymentAPI from './childrenEmploymentTable.svelte'
	import { Jumbotron } from "sveltestrap";
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';

    let isOpen=false;
    const routes = {
		"/":Home,
        "/children-out-school": SchoolAPI,
        "/children-employment": EmploymentAPI,
		'*': NotFound,
        };
</script>

<main>

    <body >
        <Navbar color="dark" dark expand = "md" >
            <NavbarBrand href="/">SOS2021-24</NavbarBrand>
            <Nav navbar >
              <NavItem  >
                <NavLink href="#/">Inicio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/children-out-school">Abandono escolar</NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#/children-employment">Niñ@s empleados</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    
    </body>

    <Router {routes}> </Router>
</main>