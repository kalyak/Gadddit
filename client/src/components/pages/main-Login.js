import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const LoginPage = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [resError, setResError] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);

    axios
      .post("/sessions", formData)
      .then((response) => {
        // console.log(response);
        setIsLogin(true);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setResError((state) => {
          return { ...state, ...error.response.data };
        });
      });
  };

  if (isLogin) {
    return <Redirect to='/user' />;
  }

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setResError({
      username: "",
      password: "",
    });
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Login Page</h1>
      </Row>
      <br />
      <br />
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <Row className='justify-content-md-center'>
          <Col sm='auto'>
            <label>Username: </label>
          </Col>
          <Col sm='auto'>
            <input
              type='text'
              name='username'
              id='username'
              required
              value={formData.username}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {resError.username} </span>
        </Row>
        <br />
        <br />
        <Row className='justify-content-md-center'>
          <Col sm='auto'>
            <label>Password: </label>
          </Col>
          <Col sm='auto'>
            <input
              type='password'
              name='password'
              id='password'
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {resError.password} </span>
        </Row>

        <br />
        <br />
        <Row className='justify-content-md-center'>
          <Button type='submit'>Login</Button>
        </Row>
      </form>
    </Container>
  );
};

export default LoginPage;
