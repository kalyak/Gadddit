import axios from "axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpvoteButton = (props) => {
  // console.log(props);

  const handleUpvote = (event) => {
    // console.log("upvote");
    // console.log(event.target);
    axios
      .put(`/qna/${props.roomId.roomid}/${props.qnaId}/upvote`, {
        withCredential: true,
      })
      .then((response) => {
        // console.log(response.data.upvote);
        pushToState();
      })
      .catch((error) => {
        console.log(error.response);
      });

    // props.handleRefresh();
  };

  const pushToState = () => {
    const newQnaList = [...props.qnaList];
    // console.log(newQnaList);
    const qnaToChange = { ...newQnaList[props.index] };
    // console.log(qnaToChange);
    const newUpvoteList = [...qnaToChange.upvote];
    newUpvoteList.push(props.userID);
    // console.log(newUpvoteList);
    qnaToChange.upvote = newUpvoteList;
    newQnaList[props.index] = qnaToChange;
    // console.log(newQnaList);
    props.setQnaList(newQnaList);
  };

  return (
    <>
      <Button
        onClick={(event) => {
          handleUpvote(event);
        }}
      >
        <FontAwesomeIcon icon="thumbs-up" />
      </Button>
    </>
  );
};
export default UpvoteButton;
