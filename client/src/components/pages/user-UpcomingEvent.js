import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import dayjs from "dayjs";

const UpcomingEvent = ({ room, index }) => {
  const [joined, setJoin] = useState(false);

  const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");

  const handleJoinEvent = () => {
    axios
      .post("/attendees/private", {
        roomCode: room.roomCode,
        roomPassword: room.roomPassword,
      })
      .then((response) => {
        console.log(response.data);
        setJoin(true);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  if (joined) {
    return <Redirect to={`/user/${room._id}`} />;
  }

  return (
    <tr key={room._id}>
      <td>{index + 1}</td>
      <td>{room.eventName}</td>
      <td>{eventDate}</td>
      <td>{room.hostName}</td>
      <td>
        <button onClick={handleJoinEvent}>Join</button>
      </td>
    </tr>
  );
};

export default UpcomingEvent;
