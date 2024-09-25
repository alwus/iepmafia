// src/pages/About.js
import { Container } from 'react-bootstrap';
import ReactGA from 'react-ga4';

const About = () => {
    ReactGA.send({
        hitType: "pageview",
        page: "/about",
        title: "About"
    })

  return (
    <Container className="mt-5">
      <h1>About</h1>
      <p>The one and only athletics team of the IEP/TI House at URI</p>
    </Container>
  );
};

export default About;
