import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Table, Container, Row } from "react-bootstrap";
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
        console.log(error.response);
      });
  }, []);

  const historyDisplay = roomHistory.map((room, index) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const noOfQna = room.questions.length;

    return (
      <tr key={room._id}>
        <td className='text-center'>{index + 1}</td>
        <td>
          <Link to={`/user/${room._id}`}>{room.eventName}</Link>
        </td>
        <td className='text-center'>{eventDate}</td>
        <td className='text-center'>{noOfQna}</td>
        <td className='text-center'>{room.hostName}</td>
        <td className='text-center'>
          <Link to={`/user/${room._id}`}>
            <button>View</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>All Attended Events</h1>
      </Row>
      <Row>
        <br />
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>S/N</th>
            <th className='text-center'>Event Name</th>
            <th className='text-center'>Event Date</th>
            <th className='text-center'># of Questions</th>
            <th className='text-center'>Hosted By</th>
            <th className='text-center'>View Room</th>
          </tr>
        </thead>
        <tbody>{historyDisplay}</tbody>
      </Table>
    </Container>
  );
};

export default UserAttended;
