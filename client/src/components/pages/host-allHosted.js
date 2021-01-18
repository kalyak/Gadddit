import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const HostHosted = () => {
  const [allHostingList, setAllHostingList] = useState([
    {
      _id: "6004f9cd9c826d03f8689520",
      eventName: "test",
      roomPassword: "test",
      eventStart: "2021-01-20T13:19:10.452Z",
      eventEnd: "2021-01-20T13:19:10.452Z",
      isPublic: false,
      hostID: "60045addd11c032a54e787ce",
      hostName: "kalya",
      createdAt: "2021-01-18T03:00:29.347Z",
      updatedAt: "2021-01-18T03:00:29.366Z",
      __v: 0,
      roomCode: "689520",
    },
    {
      _id: "6004f9cd9c826d03f8689521",
      eventName: "test2",
      roomPassword: "test",
      eventStart: "2021-01-20T13:19:10.452Z",
      eventEnd: "2021-01-20T13:19:10.452Z",
      isPublic: false,
      hostID: "60045addd11c032a54e787ce",
      hostName: "kalya",
      createdAt: "2021-01-18T03:00:29.347Z",
      updatedAt: "2021-01-18T03:00:29.366Z",
      __v: 0,
      roomCode: "689520",
    },
    {
      _id: "6004f9cd9c826d03f8689522",
      eventName: "test3",
      roomPassword: "test",
      eventStart: "2021-01-20T13:19:10.452Z",
      eventEnd: "2021-01-20T13:19:10.452Z",
      isPublic: false,
      hostID: "60045addd11c032a54e787ce",
      hostName: "kalya",
      createdAt: "2021-01-18T03:00:29.347Z",
      updatedAt: "2021-01-18T03:00:29.366Z",
      __v: 0,
      roomCode: "689520",
    },
  ]);

  useEffect(() => {
    axios
      .get("/host/past", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setAllHostingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (event) => {
    console.log(event.target.id);
    const id = event.target.id;
    axios
      .delete(`/host/${id}`, { withCredentials: true })
      .then(() => {
        const newHostingList = allHostingList.filter((list) => list._id !== id);
        setAllHostingList(newHostingList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <button id={room._id} onClick={(event) => handleDelete(event)}>
            Delete Event
          </button>
        </td>
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
      <h1>Host Hosted</h1>
      <p>Display all hosted event</p>

      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>Room Code</th>
          </tr>
        </thead>
        <tbody>{displayAllEvents}</tbody>
      </table>
    </>
  );
};

export default HostHosted;
