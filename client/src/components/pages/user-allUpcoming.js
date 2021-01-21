import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import UpcomingEvent from "./user-UpcomingEvent";

const UserUpcoming = () => {
  const [upcomingRooms, setUpcoming] = useState([]);

  useEffect(() => {
    axios
      .get("/attendees/upcoming")
      .then((response) => {
        setUpcoming(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [upcomingRooms.length]);

  const upcomingDisplay = upcomingRooms.map((room, index) => {
    return <UpcomingEvent key={room._id} room={room} index={index} />;
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Upcoming Events</h1>
      </Row>
      <Row>
        <br />
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">S/N</th>
            <th className="text-center">Event Name</th>
            <th className="text-center">Event Date</th>
            <th className="text-center">Event Time</th>
            <th className="text-center">Host</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{upcomingDisplay}</tbody>
      </Table>
    </Container>
  );
};

export default UserUpcoming;
