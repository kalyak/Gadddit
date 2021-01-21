import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import PublicEvent from "./public-UpcomingEvent";

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
    <>
      <h1>All Upcoming Event</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Host</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{publicDisplay}</tbody>
      </Table>
    </>
  );
};

export default PublicUpcoming;
