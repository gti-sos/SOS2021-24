<script>
    import {
      Button,Jumbotron
    } from "sveltestrap";
  </script>

<main>
    <head>
        <link rel='stylesheet' href='/global.css'>
        <link rel='stylesheet' href='/build/bundle.css'>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    
    <body>
        <Jumbotron>
        <ul>
            <li class="has-line-data" data-line-start="0" data-line-end="7">
            <p class="has-line-data" data-line-start="1" data-line-end="2"><strong>Equipo</strong></p>
            <ul>
            <li class="has-line-data" data-line-start="3" data-line-end="4"><a href="https://github.com/enrike7lg">Enrique Luque García</a></li>
            <li class="has-line-data" data-line-start="4" data-line-end="5"><a href="https://github.com/framacvaz ">Francisco Javier Macero Vázquez</a></li>
            <li class="has-line-data" data-line-start="5" data-line-end="6"><a href="https://github.com/juaroltor ">Juan Ignacio Roldán Torres </a></li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="6" data-line-end="7">
            <p class="has-line-data" data-line-start="6" data-line-end="7"><strong>Descripción del proyecto:</strong> Correlación entre el número de niños que abandonan la educación primaria,la prevalencia del VIH en jóvenes entre 0-14 años y el porcentaje de niños empleados entre 7-14 años.</p>
            </li>
            <li class="has-line-data" data-line-start="7" data-line-end="8">
            <p class="has-line-data" data-line-start="7" data-line-end="8"><strong>Repositorio</strong>: <a href="https://github.com/gti-sos/SOS2021-24"> <Button color="primary">SOS2021-24</Button></a></p>
            </li>
            <li class="has-line-data" data-line-start="8" data-line-end="9">
            <p class="has-line-data" data-line-start="8" data-line-end="9"><strong>URL</strong>: <a href="https://sos2021-24.herokuapp.com">https://sos2021-24.herokuapp.com</a></p>
            </li>
            <li class="has-line-data" data-line-start="9" data-line-end="14">
            <p class="has-line-data" data-line-start="9" data-line-end="10"><strong>API Backend</strong>:</p>
            <ul>
                <li class="has-line-data" data-line-start="10" data-line-end="11"><a href="https://sos2021-24.herokuapp.com/api/v2/children-out-school">https://sos2021-24.herokuapp.com/api/v2/children-out-school</a> (desarrollado por <a href="https://github.com/enrike7lg">Enrique Luque García</a>)</li>
                <li class="has-line-data" data-line-start="11" data-line-end="12"><a href="https://sos2021-24.herokuapp.com/api/v2/children-employment">https://sos2021-24.herokuapp.com/api/v2/children-employment</a> (desarrollado por <a href="https://github.com/framacvaz">Francisco Javier Macero Vázquez</a>)</li>
                <li class="has-line-data" data-line-start="12" data-line-end="13"><a href="https://sos2021-24.herokuapp.com/api/v2/children-with-hiv">https://sos2021-24.herokuapp.com/api/v2/children-with-hiv</a> (desarrollado por <a href="https://github.com/juaroltor">Juan Ignacio Roldán Torres</a>)</li>
                </ul>
            </li>
            <li class="has-line-data" data-line-start="14" data-line-end="18">
            <p class="has-line-data" data-line-start="14" data-line-end="15"><strong>API Frontend</strong>:</p>
            <ul>
                <li class="has-line-data" data-line-start="15" data-line-end="16"><a href="/#/children-out-school"> <Button color="dark">Abandono escolar</Button></a> (desarrollado por <a href="https://github.com/enrike7lg">Enrique Luque García</a>)</li>
                <li class="has-line-data" data-line-start="16" data-line-end="17"><a href="/#/children-employment"> <Button color="info">Niños/as empleados</Button></a> (desarrollado por <a href="https://github.com/framacvaz">Francisco Javier Macero Vázquez</a>)</li>
                <li class="has-line-data" data-line-start="17" data-line-end="18"><a href="/#/children-with-hiv"> <Button color="secondary">Niños/as con VIH</Button></a> (desarrollado por <a href="https://github.com/juaroltor">Juan Ignacio Roldán Torres</a>)</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="18" data-line-end="22">
            <p class="has-line-data" data-line-start="18" data-line-end="19"><strong>Documentación Postman</strong>:</p>
            <ul>
            <li class="has-line-data" data-line-start="19" data-line-end="20">Children Out School API <a href="https://documenter.getpostman.com/view/14937153/TzJoDfw2">Doc V1</a>/ /<a href="https://documenter.getpostman.com/view/14937153/TzRLkAN8">Doc V2</a>(desarrollado por <a  href="https://github.com/enrike7lg">Enrique Luque García</a>)</li>
            <li class="has-line-data" data-line-start="20" data-line-end="21">Children Employment API <a href="https://documenter.getpostman.com/view/14961891/TzJsed6w">Doc V1</a>/ /<a href="https://documenter.getpostman.com/view/14961891/TzRNE9a3">Doc V2</a> (desarrollado por <a  href="https://github.com/framacvaz">Francisco Javier Macero Vazquez</a>)</li>
            <li class="has-line-data" data-line-start="21" data-line-end="22">Children With HIV API <a href="https://documenter.getpostman.com/view/14966687/TzJoF1dY">Doc v1</a>/ /<a href="https://documenter.getpostman.com/view/14966687/TzRNE9RG">Doc v2</a> (desarrollado por <a  href="https://github.com/juaroltor">Juan Ignacio Roldán Torres</a>)</li>
            </ul>
            </li>
        </ul>
    </Jumbotron>
</main>