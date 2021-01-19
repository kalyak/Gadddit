import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import DeleteRoom from "./host-DeleteRoom";

const EditRoom = () => {
  const { roomid } = useParams();
  const [formData, setFormData] = useState({});
  const [formStart, setStart] = useState("");
  const [formEnd, setEnd] = useState("");
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState(false);

  //get the initial data
  useEffect(() => {
    axios
      .get(`/hosts/${roomid}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
        setStart(new Date(response.data.eventStart));
        setEnd(new Date(response.data.eventEnd));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleDateChange = (name, value) => {
    setFormData((state) => {
      return { ...state, [name]: value.toISOString() };
    });
  };

  const handleCheck = () => {
    setFormData((state) => {
      return { ...state, isPublic: !state.isPublic };
    });
  };

  //submit axios call to edit data
  const handleSubmitEdit = (event) => {
    console.log("data to be submitted", formData);
    event.preventDefault();
    axios
      .put(`/hosts/${roomid}`, formData, { withCredentials: true })
      .then((response) => {
        console.log("update successful, redirecting to main page");
        setUpdated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (updated) {
    return <Redirect to={"/host"} />;
  }
  console.log("formData:", formData);
  console.log(new Date());
  console.log("start date:", formStart);
  console.log("end date:", formEnd);

  return (
    <>
      {formData.eventName === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Room Details:</h1>
          <Form onSubmit={(event) => handleSubmitEdit(event)}>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Event name for display in the calendar of events.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="roomPassword">
              <Form.Label>Room Password: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter event password"
                value={formData.roomPassword}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Event password for event entry confirmation.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="eventStart">
              <Form.Label>Start Time: </Form.Label>
              <DateTimePicker
                name="eventStart"
                onChange={(event) => {
                  setStart(event);
                  setEnd(event);
                  handleDateChange("eventStart", event);
                }}
                value={formStart}
                minDate={new Date()}
                disableClock={true}
                returnValue="end"
                clearIcon={null}
                showLeadingZeros={true}
                format="dd/MM/yyyy hh:mm a"
              />
              <Form.Text className="text-muted">
                Select event start date and time.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="eventEnd">
              <Form.Label>End Time: </Form.Label>
              <DateTimePicker
                name="eventEnd"
                onChange={(event) => {
                  setEnd(event);
                  handleDateChange("eventEnd", event);
                }}
                value={formEnd}
                minDate={formStart}
                disableClock={true}
                returnValue="end"
                clearIcon={null}
                showLeadingZeros={true}
                format="dd/MM/yyyy hh:mm a"
              />
              <Form.Text className="text-muted">
                Select event end date and time.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="isPublic">
              <Form.Check
                type="checkbox"
                id="isPublic"
                label="Public Event"
                // value={true}
                checked={formData.isPublic}
                onChange={handleCheck}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Form>
          <br />
          <h6>To delete this room, please click below</h6>
          <DeleteRoom roomID={roomid} />
        </>
      )}
    </>
  );
};

export default EditRoom;
