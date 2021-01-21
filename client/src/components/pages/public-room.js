import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoginBtn from "../buttons/loginButton";

const PublicRoom = () => {
  const roomId = useParams();
  const [roomInfo, setRoom] = useState({});
  const [qnaList, setQnaList] = useState([]);
  const [filterby, setFilterby] = useState("all");
  // console.log(qnaList);
  // console.log(roomInfo);
  // console.log("roomid: ", roomId.roomid);

  useEffect(() => {
    axios
      .get(`/qna/public/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setQnaList(response.data.qna);
        setRoom(response.data.roomInfo);
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
      return (
        <tr key={qna._id}>
          <td>{index + 1}</td>

          <td>{qna.upvote.length}</td>
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
      <Row className='justify-content-md-center'>
        To submit questions to the host, please login.
      </Row>
      <br />

      <Row className='justify-content-md-center'>
        <LoginBtn />
      </Row>
      <br />
      <br />
      <br />
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
        <br />
        <br />
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
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>S/N</td>

            <td>Vote Count</td>
            <td>Question</td>
            <td>Answer</td>
          </tr>
        </thead>
        <tbody>{displayAllqna}</tbody>
      </Table>
    </Container>
  );
};

export default PublicRoom;
