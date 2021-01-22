import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">Project for General Assembly (SEI26)</h1>
          <br />
          <h2 className="text-center">Done By:</h2>
          <h4 className="text-center">Au Kok Yong</h4>
          <h4 className="text-center">Kalya Kusumadi</h4>
          <h4 className="text-center"> Sophia Ratna</h4>
        </Col>
      </Row>
      <br />

      <Row className="justify-content-md-center">
        <h2 className="text-center">Tech Stacks Used:</h2>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
              Front-End
            </h4>
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
            <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
              Back-End
            </h4>
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
      <h3 style={{ textDecoration: "underline", textAlign: "center" }}>
        Other libraries used:
      </h3>
      <br />

      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
              Front-End
            </h4>
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
            <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
              Back-End
            </h4>
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
