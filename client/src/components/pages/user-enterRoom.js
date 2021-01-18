import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const EnterRoom = () => {
  const [formData, setFormData] = useState({
    // roomID: "",
    roomCode: "",
    roomPassword: "",
  });
  const [roomID, setRoomID] = useState("");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState(false);

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
        console.log(error.response.data);
      });
  };

  if (done) {
    // console.log(roomID);
    return <Redirect to={`/user/${roomID}`} />;
  }

  return (
    <>
      <h1>Enter Room</h1>
      <p>Need to add in forms to enter rooms</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='roomCode'>
          <Form.Label>Event Code: </Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter event code'
            value={formData.roomCode}
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            Enter event code given by the event host.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='roomPassword'>
          <Form.Label>Room Password: </Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter event password'
            value={formData.roomPassword}
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            Enter event password given by the event host.
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Enter Room
        </Button>
      </Form>
    </>
  );
};

export default EnterRoom;
