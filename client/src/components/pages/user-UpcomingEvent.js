import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import dayjs from "dayjs";
import SweetAlert from "react-bootstrap-sweetalert";

const UpcomingEvent = ({ room, index }) => {
  const [confirmPopup, setPopup] = useState(false);
  const [joined, setJoin] = useState(false);

  const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
  const now = new Date();
  const startDate = new Date(room.eventStart);
  const endDate = new Date(room.eventEnd);
  const eventOngoing = now > startDate && now < endDate;

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
    <>
      <tr key={room._id}>
        <td>{index + 1}</td>
        <td>{room.eventName}</td>
        <td>{eventDate}</td>
        <td>{room.hostName}</td>
        <td>
          {eventOngoing ? (
            <button
              onClick={() => {
                setPopup(true);
              }}
            >
              Join
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
      {confirmPopup && (
        <SweetAlert
          showCancel
          confirmBtnText='Join event'
          confirmBtnBsStyle='Back to listings'
          title={
            <>
              <small>You are now joining</small>
              <p>{room.eventName} </p>
              <small>hosted by</small>
              <p>{room.hostName}</p>
            </>
          }
          onConfirm={handleJoinEvent}
          onCancel={() => {
            setPopup(false);
          }}
          // focusCancelBtn
        />
      )}
    </>
  );
};

export default UpcomingEvent;
