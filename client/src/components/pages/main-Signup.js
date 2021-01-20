import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const SignupPage = () => {
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
    console.log(formData);

    axios
      .post("/users/new", formData)
      .then((response) => {
        console.log(response);
        setPopup(true);
        console.log("first then");
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
        console.log(response);
        setIsLogin(true);
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
    <>
      <h1>Sign Up Page</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <legend>Create New Account</legend>
          <label>Username: </label>
          <input
            type='text'
            name='username'
            required
            id='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
          />
          <span style={{ color: "red" }}> {errors.username} </span>
          <br />
          <br />
          <label>Password: </label>
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
          <span style={{ color: "red" }}> {errors.password} </span>
          <br />
          <br />
          <input type='submit' />
        </fieldset>
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
        </SweetAlert>
      )}
    </>
  );
};

export default SignupPage;
