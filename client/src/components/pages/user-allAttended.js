import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const UserAttended = () => {
  const [roomHistory, setHistroy] = useState([
    {
      questions: [],
      _id: "600465d7fcc65246404f8a38",
      eventName: "future",
      roomPassword: "test",
      eventStart: "2021-01-20T13:19:10.452Z",
      eventEnd: "2021-01-20T13:19:10.452Z",
      isPublic: true,
      hostID: "60045d3bd560e43f68930ebf",
      hostName: "kokyong",
      createdAt: "2021-01-17T16:29:11.049Z",
      updatedAt: "2021-01-17T16:29:11.050Z",
      __v: 0,
      roomCode: "4f8a38",
    },
    {
      questions: [
        {
          answer: "can",
          upvote: 0,
          isFlagged: false,
          _id: "60058a3487de6610ac448620",
          question: "can we finish the project?",
          roomID: "600465bafcc65246404f8a37",
          questionBy_userID: "6001a432c3f16041ac44eff9",
          questionBy: "sophia",
          createdAt: "2021-01-18T13:16:36.204Z",
          updatedAt: "2021-01-18T13:16:36.204Z",
          __v: 0,
        },
        {
          answer: "",
          upvote: 0,
          isFlagged: false,
          _id: "60058a4087de6610ac448621",
          question: "How are you today?",
          roomID: "600465bafcc65246404f8a37",
          questionBy_userID: "6001a432c3f16041ac44eff9",
          questionBy: "sophia",
          createdAt: "2021-01-18T13:16:48.092Z",
          updatedAt: "2021-01-18T13:16:48.092Z",
          __v: 0,
        },
        {
          answer: "",
          upvote: 0,
          isFlagged: false,
          _id: "60058a4887de6610ac448622",
          question: "project project project",
          roomID: "600465bafcc65246404f8a37",
          questionBy_userID: "6001a432c3f16041ac44eff9",
          questionBy: "sophia",
          createdAt: "2021-01-18T13:16:56.769Z",
          updatedAt: "2021-01-18T13:16:56.769Z",
          __v: 0,
        },
      ],
      _id: "600465bafcc65246404f8a37",
      eventName: "testevent",
      roomPassword: "test",
      eventStart: "2021-01-10T13:19:10.452Z",
      eventEnd: "2021-01-20T13:19:10.452Z",
      isPublic: true,
      hostID: "60045addd11c032a54e787ce",
      hostName: "kalya",
      createdAt: "2021-01-17T16:28:42.700Z",
      updatedAt: "2021-01-18T13:16:56.771Z",
      __v: 0,
      roomCode: "4f8a37",
    },
    {
      questions: [],
      _id: "6004f9cd9c826d03f8689520",
      eventName: "kalya test",
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

  // useEffect(() => {
  //   axios
  //     .get("/users/past", { withCredentials: true })
  //     .then((response) => {
  //       setHistroy(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  const historyDisplay = roomHistory.map((room) => {
    const eventDate = dayjs(room.eventStart).format("DD/MM/YYYY");
    const noOfQna = room.questions.length;

    return (
      <tr key={room._id}>
        <td>{room.eventName}</td>
        <td>{eventDate}</td>
        <td>{noOfQna}</td>
        <td>{room.hostName}</td>
        <td>
          <Link to={`/user/${room._id}`}>
            <button>View</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>User All Attended</h1>
      <p>To display user's attended event, if any.</p>
      <p>Users can view the room without need to login again</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th># of Questions</th>
            <th>Host</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{historyDisplay}</tbody>
      </Table>
    </>
  );
};

export default UserAttended;
