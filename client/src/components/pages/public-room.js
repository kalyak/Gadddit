import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import QuestionField from "../others/questionField";
import UpvoteButton from "../buttons/upvoteButton";
import LoginBtn from "../buttons/loginButton";

const PublicRoom = () => {
  const roomId = useParams();
  const [roomInfo, setRoom] = useState({});
  const [qnaList, setQnaList] = useState([]);
  const [userID, setUser] = useState("");
  const [filterby, setFilterby] = useState("all");
  console.log(qnaList);
  console.log(roomInfo);
  console.log("roomid: ", roomId.roomid);

  useEffect(() => {
    axios
      .get(`/qna/public/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setQnaList(response.data.qna);
        setRoom(response.data.roomInfo);
        setUser(response.data.userID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRefresh = (event) => {
    axios
      .get(`/qna/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setQnaList(response.data.qna);
        setRoom(response.data.roomInfo);
        setUser(response.data.userID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countUnanswered = () => {
    let count = 0;
    for (let i = 0; i < qnaList.length; i++) {
      if (qnaList[i].answer === "") {
        count += 1;
      }
    }
    return count;
  };

  const countAnswered = () => {
    let count = 0;
    for (let i = 0; i < qnaList.length; i++) {
      if (qnaList[i].answer !== "") {
        count += 1;
      }
    }
    return count;
  };

  const displayAllqna = qnaList
    .filter((x) => {
      if (filterby === "answered") {
        return x.answer !== "";
      } else if (filterby === "unanswered") {
        return x.answer === "";
      } else {
        return x;
      }
    })
    .sort((a, b) => b.upvote.length - a.upvote.length)
    .map((qna, index) => {
      return (
        <tr key={qna._id}>
          <td>{index + 1}</td>
          <td></td>
          <td>{qna.upvote.length}</td>
          <td>{qna.question}</td>
          <td>{qna.answer}</td>
        </tr>
      );
    });

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterby(event.target.value);
  };

  return (
    <>
      <h1>{roomInfo.eventName}</h1>
      <h3>
        Hosted by <b>{roomInfo.hostName}</b>
      </h3>
      <br />
      To submit questions to the host, please login. <LoginBtn />
      <br />
      <br />
      <label>Filter by: </label>
      <select
        onChange={(event) => {
          handleFilter(event);
        }}
      >
        <option value='all'>All ({qnaList.length})</option>
        <option value='unanswered'>Unanswered ({countUnanswered()})</option>
        <option value='answered'>Answered ({countAnswered()})</option>
      </select>
      <br />
      <br />
      <button
        onClick={(error) => {
          handleRefresh(error);
        }}
      >
        Refresh
      </button>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>S/N</td>
            <td></td>
            <td>Vote Count</td>
            <td>Question</td>
            <td>Answer</td>
          </tr>
        </thead>
        <tbody>{displayAllqna}</tbody>
      </Table>
    </>
  );
};

export default PublicRoom;
