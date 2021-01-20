import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserAttended = () => {
  const [roomHistory, setHistroy] = useState([]);

  useEffect(() => {
    axios
      .get("/attendees/past", { withCredentials: true })
      .then((response) => {
        setHistroy(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const historyDisplay = roomHistory.map((room, index) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const noOfQna = room.questions.length;

    return (
      <tr key={room._id}>
        <td>{index + 1}</td>
        <td>{room.eventName}</td>
        <td>{eventDate}</td>
        <td>{noOfQna}</td>
        <td>{room.hostName}</td>
        <td>
          <Link to={`/user/${room._id}`}>
            <button>View</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>All Attended Events</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th># of Questions</th>
            <th>Host</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{historyDisplay}</tbody>
      </Table>
    </>
  );
};

export default UserAttended;
