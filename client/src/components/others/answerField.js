import axios from "axios";
import { useState } from "react";

const AnswerField = (props) => {
  const [editing, setEditing] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleClick = (event) => {
    setAnswer(props.answer);
    setEditing(true);
  };

  const handleDoubleClick = (event) => {
    // console.log("roomid: " + props.roomId.roomid);
    // console.log(props.roomId.roomid);
    // console.log("qnaid: " + props.qnaId);
    setAnswer(props.answer);
    setEditing(true);
  };

  const handleTextChange = (event) => {
    // console.log(event.target.value);
    setAnswer(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // console.log(answer);
    props.handleStateUpdate(answer, props.qnaId);
    setEditing(false);

    axios
      .put(
        `/qna/${props.roomId.roomid}/${props.qnaId}`,
        { answer: answer },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    props.handleRefresh();
  };

  if (props.answer === "" && editing === false) {
    return <button onClick={() => setEditing(true)}>Add Answer</button>;
  }

  if (editing) {
    return (
      <>
        <form onSubmit={handleUpdate}>
          <textarea
            value={answer}
            onChange={(event) => {
              handleTextChange(event);
            }}
          ></textarea>
          <br />
          <button type="submit">Update</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <span onDoubleClick={handleDoubleClick}>{props.answer}</span>
        <button onClick={handleClick}>Edit</button>
      </>
    );
  }
};

export default AnswerField;
