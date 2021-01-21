import axios from "axios";
import { useState } from "react";

const QuestionField = (props) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(question);

    axios
      .post(
        `/qna/${props.roomId.roomid}/new`,
        { question: question },
        { withCredentials: true }
      )
      .catch((error) => {
        console.log(error);
      });

    props.handleRefresh(event);
  };

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setQuestion(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="question"
          placeholder="Input your question here"
          onChange={handleTextChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default QuestionField;
