import { Button } from "bootstrap";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

const DeleteRoom = (props) => {
  const [popUp, setPopUp] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = () => {
    setPopUp(true);
  };

  const handleClickCancel = () => {
    setPopUp(false);
  };

  const handleConfirmDelete = () => {
    const roomID = props.roomid;
    axios
      .delete(`/hosts/${roomID}`, { withCredentials: true })
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isDeleted) {
    <Redirect to="/host" />;
  }
  return (
    <>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Delete
      </Button>
      {popUp && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={handleConfirmDelete}
          onCancel={handleClickCancel}
          focusCancelBtn
        >
          You will not be able to recover this event room!
        </SweetAlert>
      )}
    </>
  );
};

export default DeleteRoom;
