import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import UpcomingEvent from "./user-UpcomingEvent";

const UserUpcoming = () => {
  const [upcomingRooms, setUpcoming] = useState([
    // {
    //   questions: [],
    //   _id: "600465d7fcc65246404f8a38",
    //   eventName: "future",
    //   roomPassword: "test",
    //   eventStart: "2021-01-20T13:19:10.452Z",
    //   eventEnd: "2021-01-20T13:19:10.452Z",
    //   isPublic: true,
    //   hostID: "60045d3bd560e43f68930ebf",
    //   hostName: "kokyong",
    //   createdAt: "2021-01-17T16:29:11.049Z",
    //   updatedAt: "2021-01-17T16:29:11.050Z",
    //   __v: 0,
    //   roomCode: "4f8a38",
    // },
    // {
    //   questions: [],
    //   _id: "60058dc76391b14a68c7a208",
    //   eventName: "halo",
    //   roomPassword: "test",
    //   eventStart: "2021-01-20T13:19:10.452Z",
    //   eventEnd: "2021-01-20T13:19:10.452Z",
    //   isPublic: true,
    //   hostID: "60045addd11c032a54e787ce",
    //   hostName: "kalya",
    //   createdAt: "2021-01-18T13:31:51.958Z",
    //   updatedAt: "2021-01-18T13:31:51.958Z",
    //   __v: 0,
    // },
    // {
    //   questions: [],
    //   _id: "60058df9cea02b3344f1ff11",
    //   eventName: "halo",
    //   roomPassword: "test",
    //   eventStart: "2021-01-20T13:19:10.452Z",
    //   eventEnd: "2021-01-20T13:19:10.452Z",
    //   isPublic: true,
    //   hostID: "60045addd11c032a54e787ce",
    //   hostName: "kalya",
    //   createdAt: "2021-01-18T13:32:41.477Z",
    //   updatedAt: "2021-01-18T13:32:41.482Z",
    //   __v: 0,
    //   roomCode: "f1ff11",
    // },
  ]);

  useEffect(() => {
    axios
      .get("/attendees/upcoming")
      .then((response) => {
        setUpcoming(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [upcomingRooms.length]);

  const historyDisplay = upcomingRooms.map((room) => {
    return <UpcomingEvent room={room} />;
  });

  return (
    <>
      <h1>User All Upcoming</h1>
      <p>To display user's upcoming event, if any</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Host</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{historyDisplay}</tbody>
      </Table>
    </>
  );
};

export default UserUpcoming;
