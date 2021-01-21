import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import dayjs from "dayjs";
import SweetAlert from "react-bootstrap-sweetalert";
import { Container, Row, Button, Col } from "react-bootstrap";

const PublicEvent = ({ room, index }) => {
  const [confirmPopup, setPopup] = useState(false);
  const [joined, setJoin] = useState(false);

  const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
  const eventTime = dayjs(room.eventStart).format("HH:mm");

  const now = new Date();
  const startDate = new Date(room.eventStart);
  const endDate = new Date(room.eventEnd);
  const eventOngoing = now > startDate && now < endDate;

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
          // focusCancelBtn
        />
      )}
    </>
  );
};

export default PublicEvent;
