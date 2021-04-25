<script>
    import {
        Button,
        Icon,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Row,
      } from "sveltestrap";
    </script>
    
    
    <main>
      <h1>SOS2021-01</h1>
    
      <h2>Team</h2>
      <Container>
        <Col>
          <a href="http://github.com/enrike7lg">Enrique Luque García</a>
        </Col>
        
      </Container>
    
      <h2>Project description</h2>
      <p>
        Correlation between the number of children who drop out of school (primary education), 
        the prevalence of HIV in young people between 0-14 years old and the percentage of employed children between 7-14 years old.
      </p>
    
      <Container>
        <Col>
          <a href="http://github.com/gti-sos/SOS2021-24"
            ><b>Repository: </b>http://github.com/gti-sos/SOS2021-24</a
          >
        </Col>
        <Col>
          <a href="http://sos2021-24.herokuapp.com"
            ><b>URL: </b>http://sos2021-24.herokuapp.com</a
          >
        </Col>
      </Container>
    
      <h2>APIs</h2>
      <Container>
        <Col xs="auto">
          <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>Natality-stats</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
              <CardText>
                Men and women born, natality and fertlity ratios by year and
                country.
              </CardText>
              <a href="/api/v1/children-out-school"
                ><Button color="primary">Backend</Button></a
              >
              <a href="/#/children-out-school"
                ><Button color="primary">Frontend</Button></a
              >
              <a href="https://documenter.getpostman.com/view/14937153/TzJoDfw2"
                ><Button color="info">Postman Doc</Button></a
              >
            </CardBody>
            <CardFooter
              >developed by
              <a href="https://github.com/enrike7lg">Enrique Luque García</a
              ></CardFooter
            >
          </Card>
        </Col>
      </Container>
    
    
    </main>
    
    <style>
      main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
      }
      h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
      }
      b {
        color: #00c1ff;
      }
      @media (min-width: 640px) {
        main {
          max-width: none;
        }
      }
    </style>