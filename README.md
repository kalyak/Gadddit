# Project 3 - Gadddit

<!-- <working app url> -->

## PROBLEM STATEMENT

When we attend a conference/ meeting / townhall, we might have questions that we would like to ask during the presentation without interrupting the presentation itself. Some of us may wish to ask those questions anonymously as well.

## PROBLEM SOLUTION

This app aims to allow participants to post any questions they have and the organisers can address those questions at their convenient. It also allows the organizer to follow up with the questions which were not addressed during the session. The app will help to keep track of all the Q&A for each events organized!

## USER STORIES

### As Host

1. Able to create an event room and set it to either public event or private event. For private event, attendees will need to key in room credentials before they can join the room
2. Able to view all the upcoming event that was created, edit event details, and even delete the event
3. During sessions, able to view all questions posted by attendees, sorted in accordance to the number of upvotes. Mark questions as answered once addressed during the session
4. Able to view past events including all the Q&A of the respective events, post answer to those questions which were not addressed during the session

### As Attendees

1. Able view all upcoming public event and join the room if it is within the event start and end timing
2. Able to join private event room by keying in the room credentials
3. Post questions once we are inside the room, upvote other questions
4. Able to view all attended events room and view the Q&A of the respective rooms

## TECH STACKS

### Frontend:

HTML, CSS, Javascript, ReactJS

### Backend:

Express, Mongoose, MongoDB Atlas

### Other libraries used:

axios, dayjs, react-bootstrap, react-bootstrap-sweetalert, react-datepicker, react-datetime-picker, react-router-dom, bcrypt, dotenv, express-session, express-validator
