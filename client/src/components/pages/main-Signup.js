import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [done, setDone] = useState(false);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .post(" ", formData)
      .then((response) => {
        setDone(true);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  };

  if (done) {
    return <Redirect to />;
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
          />
          <br />
          <br />
          <label>Password: </label>
          <input
            // type="password"
            name='password'
            required
            id='password'
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <input type='submit' />
          <p style={{ color: "red" }}>{errors}</p>
        </fieldset>
      </form>
    </>
  );
};

export default SignupPage;
