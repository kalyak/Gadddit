import SignUpBtn from "../buttons/signupButton";
import LoginBtn from "../buttons/loginButton";
import { Container, Row, Button, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>WELCOME TO GADDDIT</h1>
      </Row>
      <br />
      <br />
      <Row className="justify-content-md-center">
        <Col sm="auto">
          <LoginBtn />
        </Col>
        <Col sm="auto">
          <SignUpBtn />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
