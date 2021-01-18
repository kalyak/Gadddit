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
      .post("/users/", formData)
      .then((response) => {
        console.log(response);
        setDone(true);
        console.log("first then");
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(error.response.data);
      });
  };

  if (done) {
    return <Redirect to="/user" />;
  }

  return (
    <>
      <h1>Sign Up Page</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <legend>Create New Account</legend>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            required
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <span style={{ color: "red" }}> {errors} </span>
          <br />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            required
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <br />
          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
};

export default SignupPage;
