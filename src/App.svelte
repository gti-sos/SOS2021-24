<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
	import { Jumbotron } from "sveltestrap";
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';

    let isOpen=false;
    const routes = {
		"/":Home,
		'*': NotFound};
</script>

<main>

    <body >
        <Jumbotron class="p-5" >
            <h1 style="text-align:center;" class="display-3">SOS2021-24</h1>
        </Jumbotron>
        <Navbar color="dark" dark expand="md" >
            <Nav navbar >
              <NavItem  >
                <NavLink  active href="#/">Inicio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/children-out-school">Abandono escolar</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    
    </body>

    <Router {routes}> </Router>
</main>