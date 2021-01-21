import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerField from "../others/answerField";
import { Table, Container, Row, Button, Col } from "react-bootstrap";

const HostRoom = () => {
  const roomId = useParams();
  const [qnaList, setQnaList] = useState([]);
  const [roomInfo, setRoom] = useState({});
  const [filterby, setFilterby] = useState("all");
  const now = new Date();
  const endTime = new Date(roomInfo.eventEnd);
  const eventOngoing = now < endTime;

  // console.log(qnaList);

  useEffect(() => {
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
  }, [roomId.roomid]);

  const handleRefresh = (event) => {
    axios
      .get(`/qna/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setQnaList(response.data.qna);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleAnswerBtn = (qnaObj) => {
    // console.log("Clicked");
    setQnaList((state) => {
      const filter = state.filter((x) => x._id !== qnaObj._id);
      const toUpdateAnswer = state.find((list) => list._id === qnaObj._id);
      // console.log(toUpdateAnswer);

      return [
        ...filter,
        { ...toUpdateAnswer, answer: "Answered during presentation" },
      ];
    });
    axios
      .put(
        `/qna/${roomId.roomid}/${qnaObj._id}`,
        {
          answer: "Answered during presentation",
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleStateUpdate = (updatedAns, qnaid) => {
    // console.log("UpdatedAns: " + updatedAns);
    // console.log("ID: " + qnaid);
    setQnaList((state) => {
      const filter = state.filter((x) => x._id !== qnaid);
      const toUpdateAnswer = state.find((list) => list._id === qnaid);
      // console.log(toUpdateAnswer);
      return [...filter, { ...toUpdateAnswer, answer: updatedAns }];
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
    .map((qnaObj, index) => {
      return (
        <tr key={qnaObj._id}>
          <td className='text-center'>{index + 1}</td>
          <td className='text-center'>{qnaObj.upvote.length}</td>
          {eventOngoing ? (
            qnaObj.answer === "" ? (
              <td className='text-center'>
                <button onClick={() => handleAnswerBtn(qnaObj)}>✔️</button>
              </td>
            ) : (
              <td></td>
            )
          ) : null}
          <td>{qnaObj.question}</td>
          <td>
            <AnswerField
              answer={qnaObj.answer}
              handleStateUpdate={handleStateUpdate}
              qnaId={qnaObj._id}
              roomId={roomId}
              handleRefresh={handleRefresh}
            />
          </td>
          {/* <td>{qnaList.answer}</td> */}
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
      <Row>
        <br />
      </Row>
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
            onClick={(event) => {
              handleRefresh(event);
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
            <td className='text-center' width='70px'>
              Vote Count
            </td>
            {eventOngoing ? (
              <td className='text-center' width='120px'>
                Answered during event
              </td>
            ) : null}
            <td className='text-center'>Question</td>
            <td className='text-center'>Answer</td>
          </tr>
        </thead>
        <tbody>{displayAllqna}</tbody>
      </Table>
    </Container>
  );
};

export default HostRoom;
