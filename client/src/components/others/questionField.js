import axios from "axios";
import { useState } from "react";
import { Table, Container, Row, Button, Col } from "react-bootstrap";

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
    setQuestion("");
    props.handleRefresh();
  };

  const handleTextChange = (event) => {
    // console.log(event.target.value);
    setQuestion(event.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={10}>
            <textarea
              name="question"
              placeholder="Post your question here"
              value={question}
              onChange={handleTextChange}
              style={{ width: "100%" }}
            />
          </Col>

          <Col sm={2}>
            <Button type="submit">Post Question</Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default QuestionField;
