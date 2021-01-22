import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="text-center">Project for General Assembly (SEI26)</h1>
        <br />
      </Row>
      <br />

      <Row className="justify-content-md-center">
        <h2 className="text-center" style={{ textDecoration: "underline" }}>
          Tech Stack
        </h2>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Front-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>ReactJS</li>
            </ul>
          </Row>
        </Col>
        <Col sm={1}></Col>
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Back-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Express</li>
              <li>Mongoose</li>
              <li>MongoDB Atlas</li>
            </ul>
          </Row>
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <h4>Other Libraries / Frameworks</h4>
      </Row>
      <br />

      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Front-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Axios</li>
              <li>Dayjs</li>
              <li>React-bootstrap</li>
              <li>React-bootstrap-sweetalert</li>
              <li>React-datepicker</li>
              <li>React-datetime-picker</li>
              <li>React-router-dom</li>
            </ul>
          </Row>
        </Col>
        <Col sm={1}></Col>
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Back-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Bcrypt</li>
              <li>Dotenv</li>
              <li>Express-session</li>
              <li>Express-validator</li>
            </ul>
          </Row>
        </Col>
      </Row>

      <br />

      <Row className="justify-content-md-center">
        <Col>
          <h2 className="text-center" style={{ textDecoration: "underline" }}>
            Done By
          </h2>
          <h5 className="text-center">Au Kok Yong</h5>
          <h5 className="text-center">Kalya Kusumadi</h5>
          <h5 className="text-center"> Sophia Ratna</h5>
        </Col>
      </Row>

      <br />

      <Row className="justify-content-md-center">
        <Col>
          <h4 className="text-center">
            Link to our{" "}
            <a
              href="https://github.com/Sophiaratna/gadddit.git"
              target="_blank"
            >
              Github Repository
            </a>
          </h4>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <footer
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            textAlign: "right",
          }}
        >
          &copy; Gadddit - 2021
        </footer>
      </Row>
    </Container>
  );
};

export default About;
