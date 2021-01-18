import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Form } from "react-bootstrap";

const HostCreate = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    roomCode: "",
    roomPassword: "",
    eventStart: new Date(),
    eventEnd: new Date(),
    isPublic: true,
  });

  const [formStart, setStart] = useState(new Date());
  const [formEnd, setEnd] = useState(new Date());

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    // console.log(event.target);
  };

  const handleDateChange = (name, value) => {
    // console.log(event.toISOString());
    // console.log(event.name);

    setFormData((state) => {
      return { ...state, [name]: value.toISOString() };
    });
  };

  return (
    <>
      <h1>Host Create New Room</h1>
      {/* <p>To add form to create new room</p> */}
      <Form>
        <fieldset>
          <legend>Create a new room</legend>
          <label htmlFor='eventName'>Event Name: </label>
          <input
            type='text'
            name='eventName'
            value={formData.eventName}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor='roomCode'>Room Code:</label>
          <input
            type='text'
            name='roomCode'
            value={formData.roomCode}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor='eventStart'>Start Time:</label>
          <DateTimePicker
            name='eventStart'
            onChange={(event) => {
              setStart(event);
              handleDateChange("eventStart", event);
            }}
            value={formStart}
            minDate={new Date()}
            disableClock={true}
            returnValue='end'
          />
          <br />
          <br />
          <label htmlFor='eventEnd'>End Time:</label>
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
          />
          {/* <input
            type='date'
            name='eventEnd'
            value={formData.eventEnd}
            onChange={handleChange}
          /> */}
          <br />
          <br />
          <label htmlFor='roomPassword'>Room Password:</label>
          <input
            type='text'
            name='roomPassword'
            value={formData.roomPassword}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor='roomType'>Public Event: </label>
          <input
            type='checkbox'
            name='isPublic'
            id='isPublic'
            value='true'
            onChange={handleChange}
            // {formData.isPublic? "checked":""}
          />
          {/* <input type='text' name='roomType' value={formData.isPublic} /> */}
        </fieldset>
      </Form>
    </>
  );
};

export default HostCreate;
