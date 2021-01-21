import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      To test sessions
      <br />
      <form action="/sessions" method="POST">
        username: <input type="text" name="username" />
        password: <input type="text" name="password" />
        <input type="submit" />
      </form>
      <hr />
      To obtain all rooms that has been created
      <form action="/hosts" method="get">
        <input type="submit" value="Get all rooms" />
      </form>
      <hr />
      To create a new room
      <br />
      <form action="/hosts/rooms/new" method="POST">
        Eventname: <input type="text" name="eventName" />
        roomPassword: <input type="text" name="roomPassword" />
        eventStart:{" "}
        <input type="text" name="eventStart" value="2021-01-20T13:19:10.452Z" />
        eventEnd:{" "}
        <input type="text" name="eventEnd" value="2021-01-20T13:19:10.452Z" />
        isPublic: <input type="text" name="isPublic" />
        <input type="submit" />
      </form>
      <hr />
      To join a public room
      <br />
      <form action="/attendees/6006d836e183274038c04a4a" method="POST">
        Room Password: <input type="text" name="roomPassword" value="install" />
        Room code: <input type="text" name="roomCode" value="c04a4a" />
        <input type="submit" />
      </form>
      <hr />
      To join a private room
      <br />
      <form action="attendees/private" method="POST">
        Room id: <input type="text" name="roomID" />
        Room Password: <input type="text" name="roomPassword" />
        Room code: <input type="text" name="roomCode" />
        <input type="submit" />
      </form>
      <hr />
      To post a question to room
      <br />
      <form action="qna/6006d836e183274038c04a4a/new" method="POST">
        question: <input type="text" name="question" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
