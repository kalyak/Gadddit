# Project 3 - Gadddit

https://gadddit.herokuapp.com/

### An integrated platform for all your event needs!

Your event participants might find large / small crowds intimidating to ask questions.

Our platform is not only catered for such group of people, it may also help increasing engagement between organizer and participants, even after the event ends!

#### Engage and captivate your participants even more with our platform now!

<br>

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
5. Able to identify and address questions that are important to attendees during the event

### As Attendees

1. Able view all upcoming public event and join the room if it is within the event start and end timing
2. Able to join private event room by keying in the room credentials
3. Post questions once we are inside the room, upvote other questions
4. Able to view all attended events room and view the Q&A of the respective rooms
5. Able to vote for the questions that are important to them

## TECH STACKS

### Frontend:

- HTML
- CSS
- Javascript
- ReactJS

### Backend:

- Express
- Mongoose
- MongoDB Atlas

### Other libraries / frameworks used:

#### Frontend:

- Axios
- Dayjs
- React-bootstrap
- React-bootstrap-sweetalert
- React-datepicker
- React-datetime-picker
- React-router-dom

#### Backend:

- Bcrypt
- Dotenv
- Express-session
- Express-validator
