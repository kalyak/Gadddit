import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const EnterRoom = () => {
  const [formData, setFormData] = useState({
    roomCode: "",
    roomPassword: "",
  });
  const [roomID, setRoomID] = useState("");
  const [done, setDone] = useState(false);
  const [resError, setResError] = useState({});
  const [unauthorized, setUnauth] = useState(false);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/attendees/private", formData)
      .then((response) => {
        setRoomID(response.data.roomID);
        setDone(true);
      })
      .catch((error) => {
        console.log(error.response.data.unauthorized);
        setResError((state) => {
          return { ...state, ...error.response.data };
        });
        if (error.response.data.unauthorized) {
          setUnauth(true);
        }
      });
  };

  if (done) {
    // console.log(roomID);
    return <Redirect to={`/user/${roomID}`} />;
  }

  if (unauthorized) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <h1>Join Room</h1>
          </Row>
          <Row>
            <p>To join a room, please key in the room code and password</p>
          </Row>

          <Form.Group controlId="roomCode">
            <Row>
              <Form.Label>Room Code: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter event code"
                value={formData.roomCode}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <span style={{ color: "red" }}>
                {resError.database}
                {resError.roomCode}
              </span>
            </Row>
            <Row>
              <Form.Text className="text-muted">
                Enter event code given by the event host.
              </Form.Text>
            </Row>
          </Form.Group>

          <Form.Group controlId="roomPassword">
            <Row>
              <Form.Label>Room Password: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter event password"
                value={formData.roomPassword}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <span style={{ color: "red" }}> {resError.roomPassword} </span>
            </Row>
            <Row>
              <Form.Text className="text-muted">
                Enter event password given by the event host.
              </Form.Text>
            </Row>
          </Form.Group>

          <Row className="justify-content-md-center">
            <Button variant="primary" type="submit">
              Enter Room
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default EnterRoom;
