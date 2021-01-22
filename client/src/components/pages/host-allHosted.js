import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Table, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const HostHosted = () => {
  const [allHostedListing, setAllHostedListing] = useState([]);

  useEffect(() => {
    axios
      .get("/hosts/past", { withCredentials: true })
      .then((response) => {
        // console.log(response);
        setAllHostedListing(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const countUnanswered = (questions) => {
    let count = 0;
    for (let question of questions) {
      if (question.answer === "") {
        count += 1;
      }
    }
    return count;
  };
  const displayAllEvents = allHostedListing.map((room, index) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");

    return (
      <tr key={room._id}>
        <td className="text-center">{index + 1}</td>
        <td>
          <Link to={`/host/${room._id}`}>{room.eventName}</Link>
        </td>
        <td className="text-center">{eventDate}</td>
        <td className="text-center">{room.questions.length}</td>
        <td className="text-center">{countUnanswered(room.questions)}</td>
        <td className="text-center">
          <Link to={`/host/${room._id}`}>
            <Button>View</Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <h1>Past Events</h1>
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
              <th className="text-center"># of questions</th>
              <th className="text-center"># of unanswered</th>
              <th className="text-center">View Room</th>
            </tr>
          </thead>
          <tbody>{displayAllEvents}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default HostHosted;
