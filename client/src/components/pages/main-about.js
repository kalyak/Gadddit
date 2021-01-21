import { Container } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container>
        <h1 className="text-center">Project 3 - General Assembly - SEI26</h1>
        <br />
        <br />
        <br />
        <h1 className="text-center">Au Kok Yong</h1>
        <h1 className="text-center">Kalya Kusumadi</h1>
        <h1 className="text-center"> Sophia Ratna</h1>
        <br />
        <br />
        <h2 className="text-center">Tech Stacks Used:</h2>
        <br />
        <h3 style={{ textDecoration: "underline", textAlign: "center" }}>
          Front end:
        </h3>
        <h5 className="text-center">HTML, CSS, Javascript, ReactJS</h5>
        <br />
        <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
          Back end:
        </h4>
        <h5 className="text-center">Express, Mongoose, MongoDB Atlas</h5>
        <br />
        <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
          Other libraries used:
        </h4>
        <h5 className="text-center">
          axios, dayjs, react-bootstrap, react-bootstrap-sweetalert,
          react-datepicker, react-datetime-picker, react-router-dom, bcrypt,
          dotenv, express-session, express-validator
        </h5>
      </Container>
      <footer style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <h1>&copy; Gadddit - 2021</h1>
      </footer>
    </>
  );
};

export default About;
