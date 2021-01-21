import { useState } from "react";
import axios from "axios";

const UpvoteButton = (props) => {
  // console.log(props);

  const [upvote, setUpvote] = useState(false);

  const handleUpvote = (event) => {
    // setUpvote(true);
    // console.log("upvote");
    // console.log(event.target);
    axios
      .put(`/qna/${props.roomId.roomid}/${props.qnaId}/upvote`, {
        withCredential: true,
      })
      .then((response) => {
        console.log(response.data.upvote);
        pushToState();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pushToState = () => {
    const newQnaList = [...props.qnaList];
    console.log(newQnaList);
    const qnaToChange = { ...newQnaList[props.index] };
    console.log(qnaToChange);
    const newUpvoteList = [...qnaToChange.upvote];
    newUpvoteList.push(props.userID);
    console.log(newUpvoteList);
    qnaToChange.upvote = newUpvoteList;
    newQnaList[props.index] = qnaToChange;
    console.log(newQnaList);
    props.setQnaList(newQnaList);
  };

  const handleUnvote = (event) => {
    setUpvote(false);
    // console.log("unvote");
    // console.log(event.target);
    axios
      .delete(`/qna/${props.roomId.roomid}/${props.qnaId}/upvote`, {
        withCredential: true,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (upvote) {
  //   return (
  //     <>
  //       <button
  //         onClick={(event) => {
  //           handleUnvote(event);
  //         }}
  //       >
  //         Unvote
  //       </button>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <button
  //         onClick={(event) => {
  //           handleUpvote(event);
  //         }}
  //       >
  //         Vote
  //       </button>
  //     </>
  //   );
  // }

  return (
    <>
      <button
        onClick={(event) => {
          handleUpvote(event);
        }}
      >
        Vote
      </button>
    </>
  );
};
export default UpvoteButton;
