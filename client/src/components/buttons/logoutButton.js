import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const LogoutBtn = () => {
  const [loggedOut, setLogout] = useState(false);
  const [error, setError] = useState("");
  const [errorPopup, setPopup] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .delete("/sessions/")
      .then((response) => {
        setLogout(true);
      })
      .catch((err) => {
        setError(err);
        setPopup(true);
      });
  };

  if (loggedOut) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {errorPopup && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText='Logout'
          confirmBtnBsStyle='danger'
          title='Sorry, we are unable to process your request.'
          onConfirm={handleLogout}
          onCancel={() => {
            setPopup(false);
          }}
          focusCancelBtn
        >
          {error}
        </SweetAlert>
      )}
    </>
  );
};

export default LogoutBtn;
