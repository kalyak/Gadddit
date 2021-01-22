import dayjs from "dayjs";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

const PublicEvent = ({ room, index }) => {
  const [confirmPopup, setPopup] = useState(false);
  const [joined, setJoin] = useState(false);

  const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
  const eventTime = dayjs(room.eventStart).format("HH:mm");

  const now = new Date();
  const startDate = new Date(room.eventStart);
  const endDate = new Date(room.eventEnd);
  const eventOngoing = startDate < now && now < endDate;

  const handleJoinEvent = () => {
    setJoin(true);
  };

  if (joined) {
    return <Redirect to={`/public/${room._id}`} />;
  }

  return (
    <>
      <tr key={room._id}>
        <td className="text-center">{index + 1}</td>
        <td>{room.eventName}</td>
        <td className="text-center">{eventDate}</td>
        <td className="text-center">{eventTime}</td>

        <td className="text-center">{room.hostName}</td>
        <td className="text-center">
          {eventOngoing ? (
            <Button
              onClick={() => {
                setPopup(true);
              }}
            >
              Join
            </Button>
          ) : null}
        </td>
      </tr>
      {confirmPopup && (
        <SweetAlert
          showCancel
          confirmBtnText="Join event"
          confirmBtnBsStyle="Back to listings"
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
        />
      )}
    </>
  );
};

export default PublicEvent;
