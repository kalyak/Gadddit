import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const HostCreate = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    roomPassword: "",
    eventStart: new Date().toISOString(),
    eventEnd: new Date().toISOString(),
    isPublic: false,
  });

  const [formStart, setStart] = useState(new Date());
  const [formEnd, setEnd] = useState(new Date());
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/hosts/rooms/new", formData)
      .then((response) => {
        setDone(true);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  };

  if (done) {
    return <Redirect to={"/host"} />;
  }

  return (
    <div className='container'>
      <Col></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <h1>Host Create New Room</h1>
          <Form.Group controlId='eventName'>
            <Form.Label>Event Name: </Form.Label>
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
              Event password for event entry confirmation.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='eventStart'>
            <Form.Label>Start Time: </Form.Label>
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
              calendarIcon={null}
              showLeadingZeros={true}
              format='dd/MM/yyyy hh:mm a'
            />
            <Form.Text className='text-muted'>
              Select event start date and time.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='eventEnd'>
            <Form.Label>End Time: </Form.Label>
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
              calendarIcon={null}
              showLeadingZeros={true}
              format='dd/MM/yyyy hh:mm a'
              activeStartDate={formStart}
            />
            <Form.Text className='text-muted'>
              Select event end date and time.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='isPublic'>
            <Form.Check
              type='checkbox'
              id='isPublic'
              label='Public Event'
              // value={true}
              checked={formData.isPublic}
              onChange={handleCheck}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Create Event
          </Button>

          {/* <DatePicker
            selected={formEnd}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat='Pp'
          /> */}
        </Form>
      </Col>
      <Col></Col>
    </div>
  );
};

export default HostCreate;
