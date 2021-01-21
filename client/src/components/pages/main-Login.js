import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
        // console.log(error.response.data);
        setResError((state) => {
          return { ...state, ...error.response.data };
        });
      });
  };

  if (isLogin) {
    // setLoggedIn(true);

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
    <>
      <h1>Login Page</h1>

      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          required
          value={formData.username}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}> {resError.username} </span>
        <br />
        <br />
        <label>Password: </label>
        <input
          type='password'
          name='password'
          id='password'
          required
          value={formData.password}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}> {resError.password} </span>

        {/* <br />
        <br />
        <label>Signing As: </label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="host">Host</option>
          <option value="attendee">Attendee</option>
        </select> */}
        <br />
        <br />
        <input type='submit' value='Login' />
      </form>
    </>
  );
};

export default LoginPage;
