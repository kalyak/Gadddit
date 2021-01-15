const users = [
  {
    _id: user1,
    username: "sophia",
    password: "sophia",
    roomHostedHistoryID: ["roomA", "roomB", "roomC"],
    roomAttendedHistoryID: ["roomD", "roomE"],
  },
  {
    _id: user2,
    username: "kalya",
    password: "kalya",
    roomHostedHistoryID: ["roomD", "roomE", "roomF"],
    roomAttendedHistoryID: ["roomA", "roomB", "roomC"],
  },
  {
    _id: user3,
    username: "kokyong",
    password: "kokyong",
    roomHostedHistoryID: [],
    roomAttendedHistoryID: ["roomA", "roomB", "roomC", "roomD", "roomE"],
  },
];

const room = [
  {
    _id: "roomA",
    roomName: "room1",
    roomPassword: "rm1password",
    hostID: "user1",
    eventStart: new Date(2020, 12, 31, 22, 00, 00),
    eventDate: new Date(2021, 01, 01, 03, 00, 00),
    isStarted: true,
    isEnded: true,
  },
  {
    _id: "roomB",
    roomName: "room2",
    roomPassword: "rm2password",
    hostID: "user1",
    eventStart: new Date(2021, 01, 03, 15, 45, 00),
    eventDate: new Date(2021, 01, 03, 16, 15, 00),
    isStarted: true,
    isEnded: true,
  },
  {
    _id: "roomC",
    roomName: "room3",
    roomPassword: "rm3password",
    hostID: "user1",
    eventStart: new Date(2021, 01, 20, 10, 00, 00),
    eventEnd: new Date(2021, 01, 20, 12, 00, 00),
    isStarted: false,
    isEnded: false,
  },
  {
    _id: "roomD",
    roomName: "room4",
    roomPassword: "rm4password",
    hostID: "user2",
    eventStart: new Date(2021, 01, 15, 17, 00, 00),
    eventEnd: new Date(2021, 01, 15, 18, 00, 00),
  },
  {
    _id: "roomE",
    roomName: "room5",
    roomPassword: "rm5password",
    hostID: "user2",
    eventStart: new Date(2021, 01, 03, 14, 30, 00),
    eventEnd: new Date(2021, 01, 04, 07, 00, 00),
  },
];

const Qna = [
  {
    roomID: "roomA",
    question: "Is my schema correct?",
    questionBy_userID: "user3",
    answer: "yes",
    upvote: 3,
    isHidden: false,
  },
  {
    roomID: "roomA",
    question: "Is everything ok?",
    questionBy_userID: "user3",
    upvote: 3,
    isHidden: false,
  },
  {
    roomID: "roomB",
    question: "How are you?",
    questionBy_userID: "user2",
    upvote: 2,
    isHidden: false,
  },
  {
    roomID: "roomA",
    question: "How are you?",
    questionBy_userID: "user2",
    answer: "I'm doing fine, thank you for asking",
    upvote: 20,
    isHidden: false,
  },
  {
    roomID: "roomA", //from URL?
    question: "How are you?", //from form
    questionBy_userID: "user2", //from sessions
    upvote: 0,
    isHidden: false,
  },
];
