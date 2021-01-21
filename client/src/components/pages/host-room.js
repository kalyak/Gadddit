import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerField from "../others/answerField";
import { Table } from "react-bootstrap";

const HostRoom = () => {
  const roomId = useParams();
  const [qnaList, setQnaList] = useState([]);
  const [filterby, setFilterby] = useState("all");
  // console.log(qnaList);

  useEffect(() => {
    axios
      .get(`/qna/${roomId.roomid}`, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setQnaList(response.data.qna);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        console.log(error);
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
          <td>{index + 1}</td>
          <td>{qnaObj.upvote.length}</td>

          {qnaObj.answer === "" ? (
            <td>
              <button onClick={() => handleAnswerBtn(qnaObj)}>✔️</button>
            </td>
          ) : (
            <td></td>
          )}

          <td>{qnaObj.question}</td>
          <td>
            <AnswerField
              answer={qnaObj.answer}
              handleStateUpdate={handleStateUpdate}
              qnaId={qnaObj._id}
              roomId={roomId}
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
    <>
      <h1>Host QnA Page</h1>
      <p>Display all QnA from database</p>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>S/N</td>
            <td>Upvote</td>
            <td>Answered during event</td>
            <td>Question</td>
            <td>Answer</td>
          </tr>
        </thead>
        <tbody>{displayAllqna}</tbody>
      </Table>
    </>
  );
};

export default HostRoom;
