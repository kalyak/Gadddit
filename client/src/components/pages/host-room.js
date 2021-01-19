import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AnswerField from "../others/answerField";

const HostRoom = () => {
  const roomId = useParams();
  console.log(roomId.roomid);
  const [qnaList, setQnaList] = useState([
    {
      answer: "answer1",
      upvote: 20,
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
      answer: "answer2",
      upvote: 14,
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
      upvote: 15,
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
  ]);
  const [filterby, setFilterby] = useState("all");

  // axios
  //   .get(`hosts/${roomId.roomid}`, { withCredentials: true })
  //   .then((response) => {
  //     console.log(response.data);
  //     setQnaList(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const handleAnswerBtn = (qnaArr) => {
    console.log("Clicked");
    setQnaList((state) => {
      const filter = state.filter((x) => x._id !== qnaArr._id);
      const toUpdateAnswer = state.find((list) => list._id === qnaArr._id);
      console.log(toUpdateAnswer);

      return [
        ...filter,
        { ...toUpdateAnswer, answer: "Answered during presentation" },
      ];
    });
  };

  const handleStateUpdate = (updatedAns, qnaid) => {
    console.log("UpdatedAns: " + updatedAns);
    console.log("ID: " + qnaid);

    setQnaList((state) => {
      const filter = state.filter((x) => x._id !== qnaid);
      const toUpdateAnswer = state.find((list) => list._id === qnaid);
      console.log(toUpdateAnswer);
      return [...filter, { ...toUpdateAnswer, answer: updatedAns }];
    });
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
    .sort((a, b) => b.upvote - a.upvote)
    .map((qnaList, index) => {
      return (
        <tr key={qnaList._id}>
          <td>{index + 1}</td>
          <td>{qnaList.upvote}</td>

          {qnaList.answer === "" ? (
            <td>
              <button onClick={() => handleAnswerBtn(qnaList)}>✔️</button>
            </td>
          ) : (
            <td></td>
          )}

          <td>{qnaList.question}</td>
          <td>
            <AnswerField
              answer={qnaList.answer}
              handleStateUpdate={handleStateUpdate}
              qnaId={qnaList._id}
              roomId={roomId}
            />
          </td>
          {/* <td>{qnaList.answer}</td> */}
        </tr>
      );
    });

  const handleFilter = (event) => {
    console.log(event.target.value);

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
        <option value="all">All</option>
        <option value="unanswered">Unanswered</option>
        <option value="answered">Answered</option>
      </select>
      <br />
      <br />
      <table>
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
      </table>
    </>
  );
};

export default HostRoom;
