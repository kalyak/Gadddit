import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { Container, Row, Button, Col } from "react-bootstrap";

const SignupPage = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [donePopup, setPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [resError, setResError] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleValidation = (errors) => {
    const validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.param] = error.msg;
    });
    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);

    axios
      .post("/users/new", formData)
      .then((response) => {
        // console.log(response);
        setPopup(true);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          console.log(error.response.data.errors);
          handleValidation(error.response.data.errors);
        } else {
          console.log(error.response.data);
          setErrors(error.response.data);
        }
      });
  };

  const handlenextPage = () => {
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

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Sign Up Page</h1>
      </Row>
      <br />
      <br />
      <Row className='justify-content-md-center'>
        <h3>Create your new account here:</h3>
      </Row>
      <br />
      <br />

      <form onSubmit={(event) => handleSubmit(event)}>
        <Row className='justify-content-md-center'>
          <Col sm='auto'>
            <label>Username: </label>
          </Col>
          <Col sm='auto'>
            <input
              type='text'
              name='username'
              required
              id='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {errors.username} </span>
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
              required
              id='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              minLength='8'
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {errors.password} </span>
        </Row>
        <Row className='justify-content-md-center'>
          <Button type='submit'>Sign Up </Button>
        </Row>
      </form>

      {donePopup && (
        <SweetAlert
          success
          title='Welcome to Gaddit!'
          onConfirm={handlenextPage}
          // onCancel={this.onCancel}
          confirmBtnText='Go to home page'
        >
          You have succesfully signed up!
          <Row className='justify-content-md-center'>
            <span style={{ color: "red" }}> {resError} </span>
          </Row>
        </SweetAlert>
      )}
    </Container>
  );
};

export default SignupPage;
