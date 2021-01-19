import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
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
        console.log(error);
      });
  }, [upcomingRooms.length]);

  const historyDisplay = upcomingRooms.map((room) => {
    return <UpcomingEvent room={room} />;
  });

  return (
    <>
      <h1>All Upcoming Event</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Host</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{historyDisplay}</tbody>
      </Table>
    </>
  );
};

export default UserUpcoming;
