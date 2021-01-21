import axios from "axios";
import { useState } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";

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
    return <Button onClick={() => setEditing(true)}>Add Answer</Button>;
  }

  if (editing) {
    return (
      <Container>
        <form onSubmit={handleUpdate}>
          <Row>
            <textarea
              value={answer}
              onChange={(event) => {
                handleTextChange(event);
              }}
              style={{ width: "100%" }}
            ></textarea>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col sm="auto">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Col>
            <Col sm="auto">
              <Button variant="danger" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col sm={10}>
            <span onDoubleClick={handleDoubleClick}>{props.answer}</span>
          </Col>
          <Col sm={2}>
            <Button className="text-end" onClick={handleClick}>
              Edit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default AnswerField;
