import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { Link, Redirect, useParams } from "react-router-dom";
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
        // console.log(response.data);
        setFormData(response.data);
        setStart(new Date(response.data.eventStart));
        setEnd(new Date(response.data.eventEnd));
      })
      .catch((error) => {
        setErrors(error.response);
      });
  }, [roomid]);

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
    // console.log("data to be submitted", formData);
    event.preventDefault();
    axios
      .put(`/hosts/${roomid}`, formData, { withCredentials: true })
      .then((response) => {
        // console.log("update successful, redirecting to main page");
        setUpdated(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  if (updated) {
    return <Redirect to={"/host"} />;
  }
  // console.log("formData:", formData);
  // console.log(new Date());
  // console.log("start date:", formStart);
  // console.log("end date:", formEnd);

  return (
    <>
      {formData.eventName === undefined ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <Row className='justify-content-md-center'>
            <Form onSubmit={(event) => handleSubmitEdit(event)}>
              <h1>Edit Room Details</h1>
              <br />
              <Form.Group as={Row} controlId='eventName'>
                <Form.Label column sm={4}>
                  Event Name:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter event name'
                    value={formData.eventName}
                    onChange={handleChange}
                  />
                  <Form.Text className='text-muted'>
                    Event name for display in the calendar of events.
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='roomPassword'>
                <Form.Label column sm={4}>
                  Room Password:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter event password'
                    value={formData.roomPassword}
                    onChange={handleChange}
                  />
                  <Form.Text className='text-muted'>
                    Event password for event entry confirmation.
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='eventStart'>
                <Form.Label column sm={4}>
                  Start Time:
                </Form.Label>
                <Col sm={8}>
                  <DateTimePicker
                    name='eventStart'
                    onChange={(event) => {
                      setStart(event);
                      setEnd(event);
                      handleDateChange("eventStart", event);
                    }}
                    value={formStart}
                    minDate={new Date()}
                    disableClock={true}
                    returnValue='end'
                    clearIcon={null}
                    showLeadingZeros={true}
                    format='dd/MM/yyyy hh:mm a'
                  />
                  <Form.Text className='text-muted'>
                    Select event start date and time.
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='eventEnd'>
                <Form.Label column sm={4}>
                  End Time:
                </Form.Label>
                <Col sm={8}>
                  <DateTimePicker
                    name='eventEnd'
                    onChange={(event) => {
                      setEnd(event);
                      handleDateChange("eventEnd", event);
                    }}
                    value={formEnd}
                    minDate={formStart}
                    disableClock={true}
                    returnValue='end'
                    clearIcon={null}
                    showLeadingZeros={true}
                    format='dd/MM/yyyy hh:mm a'
                  />
                  <Form.Text className='text-muted'>
                    Select event end date and time.
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId='isPublic'>
                <Col sm={4}></Col>
                <Col sm={8}>
                  <Form.Check
                    type='checkbox'
                    id='isPublic'
                    label='Public Event'
                    // value={true}
                    checked={formData.isPublic}
                    onChange={handleCheck}
                  />
                </Col>
              </Form.Group>

              <Row className='justify-content-md-center'>
                <Col sm='auto'>
                  <Button variant='primary' type='submit'>
                    Submit Edit
                  </Button>
                </Col>
                <Col sm='auto'>
                  <Link to='/host'>
                    <Button variant='danger'>Cancel Edit</Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row className='justify-content-md-center'>
            <span style={{ color: "red" }}> {errors} </span>
          </Row>
          <br />
          <Row className='justify-content-md-center'>
            <h6>To delete this room, please click below</h6>
          </Row>
          <Row className='justify-content-md-center'>
            <DeleteRoom roomID={roomid} />
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditRoom;
