import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteRoom from "./host-DeleteRoom";

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

  const displayAllEvents = allHostingList.map((room) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const eventTime = dayjs(room.eventStart).format("HH:mm");

    return (
      <tr key={room._id}>
        <td>{room.eventName}</td>
        <td>{eventDate}</td>
        <td>{eventTime}</td>
        <td>{room.roomCode}</td>
        <td>
          <Link to={`/host/${room._id}/edit`}>
            <button id={room._id}>Edit Event</button>
          </Link>
        </td>
        <td>
          <Link to={`/host/${room._id}`}>
            <button>Start Event</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Upcoming Event</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>Room Code</th>
          </tr>
        </thead>
        <tbody>{displayAllEvents}</tbody>
      </Table>
    </>
  );
};

export default HostHosting;
