import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const HostHosted = () => {
  const [allHostedListing, setAllHostedListing] = useState([]);

  useEffect(() => {
    axios
      .get("/hosts/past", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setAllHostedListing(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDirectToRoom = (event) => {
    console.log(event.target.id);
    const roomid = event.target.id;
  };

  const countUnanswered = (questions) => {
    let count = 0;
    for (let question of questions) {
      if (question.answer === "") {
        count += 1;
      }
    }
    return count;
  };
  const displayAllEvents = allHostedListing.map((room) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const eventTime = dayjs(room.eventStart).format("HH:mm");

    return (
      <tr key={room._id}>
        <td>{room.eventName}</td>
        <td>{eventDate}</td>
        <td>{eventTime}</td>
        <td>{room.questions.length}</td>
        <td>{countUnanswered(room.questions)}</td>
        <td>
          <Link to={`/host/${room._id}`}>
            <button>View Room</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Past Hosted Events</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th># of questions</th>
            <th># of unanswered</th>
          </tr>
        </thead>
        <tbody>{displayAllEvents}</tbody>
      </Table>
    </>
  );
};

export default HostHosted;
