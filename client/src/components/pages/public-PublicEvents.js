import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import PublicEvent from "./public-UpcomingEvent";
import { Container, Row, Button, Col } from "react-bootstrap";

const PublicUpcoming = () => {
  const [upcomingRooms, setUpcoming] = useState([]);

  useEffect(() => {
    axios
      .get("/attendees/public")
      .then((response) => {
        setUpcoming(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [upcomingRooms.length]);

  const publicDisplay = upcomingRooms.map((room, index) => {
    return <PublicEvent key={room._id} room={room} index={index} />;
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>All Upcoming Event</h1>
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
        <tbody>{publicDisplay}</tbody>
      </Table>
    </Container>
  );
};

export default PublicUpcoming;
