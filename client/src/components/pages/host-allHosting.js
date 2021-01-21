import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Table, Container, Row } from "react-bootstrap";

const HostHosting = () => {
  const [allHostingList, setAllHostingList] = useState([]);

  useEffect(() => {
    axios
      .get("/hosts/upcoming", { withCredentials: true })
      .then((response) => {
        console.log("all hosting list", response.data);
        setAllHostingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleDelete = (event) => {
  //   console.log(event.target.id);
  //   const id = event.target.id;
  //   axios
  //     .delete(`/host/${id}`, { withCredentials: true })
  //     .then(() => {
  //       const newHostingList = allHostingList.filter((list) => list._id !== id);
  //       setAllHostingList(newHostingList);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDirectToRoom = (event) => {
    console.log(event.target.id);
    const roomid = event.target.id;
  };

  const displayAllEvents = allHostingList.map((room, index) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const eventTime = dayjs(room.eventStart).format("HH:mm");

    return (
      <tr key={room._id}>
        <td className="text-center">{index + 1}</td>
        <td>
          <Link to={`/host/${room._id}`}>{room.eventName}</Link>
        </td>
        <td className="text-center">{eventDate}</td>
        <td className="text-center">{eventTime}</td>
        <td className="text-center">{room.roomCode}</td>
        <td className="text-center">
          <Link to={`/host/${room._id}/edit`}>
            <button id={room._id}>Edit Event</button>
          </Link>
        </td>
        <td className="text-center">
          <Link to={`/host/${room._id}`}>
            <button>Start Event</button>
          </Link>
        </td>
      </tr>
    );
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
            <th className="text-center">Room Code</th>
            <th colSpan="2" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{displayAllEvents}</tbody>
      </Table>
    </Container>
  );
};

export default HostHosting;
