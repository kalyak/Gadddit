import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";

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
    const roomID = props.roomID;
    // setIsDeleted(true);
    axios
      .delete(`/hosts/${roomID}`, { withCredentials: true })
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  if (isDeleted) {
    return <Redirect to='/host' />;
  }
  return (
    <>
      <Button
        variant='primary'
        type='submit'
        onClick={() => {
          handleClick();
        }}
      >
        Delete
      </Button>
      {popUp && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText='Yes, delete it!'
          confirmBtnBsStyle='danger'
          title='Are you sure?'
          onConfirm={() => handleConfirmDelete()}
          onCancel={() => handleClickCancel()}
          focusCancelBtn
        >
          You will not be able to recover this event room!
        </SweetAlert>
      )}
    </>
  );
};

export default DeleteRoom;
