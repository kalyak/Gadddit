import axios from "axios";
import { useState } from "react";

const AnswerField = (props) => {
  const [editing, setEditing] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleClick = (event) => {
    setEditing(true);
  };

  const handleDoubleClick = (event) => {
    setAnswer(props.answer);
    setEditing(true);
  };

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setAnswer(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(answer);
    props.handleStateUpdate(answer, props.qnaId);
    setEditing(false);

    axios
      .put(
        `/qna/${props.roomId}/${props.qnaId}`,
        { answer: answer },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <button type="submit">Update</button>
        </form>
      </>
    );
  }
  return (
    <>
      <span onDoubleClick={handleDoubleClick}>{props.answer}</span>
      {/* <button onClick={handleClick}>Edit</button> */}
    </>
  );
};

export default AnswerField;
