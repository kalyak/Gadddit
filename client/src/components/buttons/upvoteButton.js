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
      })
      .catch((error) => {
        console.log(error);
      });

    props.handleRefresh();
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
