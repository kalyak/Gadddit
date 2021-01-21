import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Container, Row, Button, Col } from "react-bootstrap";
import QuestionField from "../others/questionField";
import UpvoteButton from "../buttons/upvoteButton";

const UserRoom = () => {
  const roomId = useParams();
  const [roomInfo, setRoom] = useState({});
  const [qnaList, setQnaList] = useState([]);
  const [userID, setUser] = useState("");
  const [filterby, setFilterby] = useState("all");
  const now = new Date();
  const endTime = new Date(roomInfo.eventEnd);
  const eventOngoing = now < endTime;
  // console.log(endTime);
  // console.log(eventOngoing);
  // console.log(qnaList);
  // console.log(roomInfo);
  // console.log("roomid: ", roomId.roomid);

  useEffect(() => {
    axios
      .get(`/qna/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setQnaList(response.data.qna);
        setRoom(response.data.roomInfo);
        setUser(response.data.userID);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [roomId.roomid]);

  const handleRefresh = (event) => {
    axios
      .get(`/qna/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setQnaList(response.data.qna);
        setRoom(response.data.roomInfo);
        setUser(response.data.userID);
      })
      .catch((error) => {
        console.log(error.response);
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
      const upVoted = qna.upvote.includes(userID);
      return (
        <tr key={qna._id}>
          <td className='text-center'>{index + 1}</td>
          {eventOngoing ? (
            upVoted ? (
              <td className='text-center'></td>
            ) : (
              <td className='text-center'>
                <UpvoteButton
                  roomId={roomId}
                  qnaId={qna._id}
                  userID={userID}
                  setQnaList={setQnaList}
                  index={index}
                  qnaList={qnaList}
                  handleRefresh={handleRefresh}
                />
              </td>
            )
          ) : null}

          <td className='text-center'>{qna.upvote.length}</td>
          <td>{qna.question}</td>
          <td>{qna.answer}</td>
        </tr>
      );
    });

  const handleFilter = (event) => {
    // console.log(event.target.value);
    setFilterby(event.target.value);
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>{roomInfo.eventName}</h1>
      </Row>
      <Row className='justify-content-md-center'>
        <h3>
          Hosted by <b>{roomInfo.hostName}</b>
        </h3>
      </Row>
      <br />
      <br />
      <br />
<<<<<<< HEAD

      {eventOngoing ? (
        <>
          <QuestionField roomId={roomId} handleRefresh={handleRefresh} />
          <br />
          <br />
          <br />
        </>
      ) : (
        ""
      )}
=======
      {eventOngoing ? (
        <QuestionField roomId={roomId} handleRefresh={handleRefresh} />
      ) : null}
      <br />
      <br />
      <br />
>>>>>>> master

      <Row>
        <Col sm={10}>
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
        </Col>

        <Col>
          <Button
            variant='success'
            onClick={(error) => {
              handleRefresh(error);
            }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td className='text-center' width='70px'>
              S/N
            </td>
            {eventOngoing ? (
              <td className='text-center' width='70px'></td>
            ) : null}
            <td className='text-center' width='120px'>
              Vote Count
            </td>
            <td className='text-center'>Question</td>
            <td className='text-center'>Answer</td>
          </tr>
        </thead>
        <tbody>{displayAllqna}</tbody>
      </Table>
    </Container>
  );
};

export default UserRoom;
