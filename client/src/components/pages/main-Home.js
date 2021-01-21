import { Col, Container, Row } from "react-bootstrap";
import LoginBtn from "../buttons/loginButton";
import SignUpBtn from "../buttons/signupButton";

const Home = () => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>WELCOME TO GADDDIT</h1>
      </Row>
      <br />
      <br />
      <Row className='justify-content-md-center'>
        <Col sm='auto'>
          <LoginBtn />
        </Col>
        <Col sm='auto'>
          <SignUpBtn />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
