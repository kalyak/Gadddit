# project-3-<Gadddit>

<!-- <working app url> -->

## PROBLEM STATEMENT

Let's say we are in a conference/ meeting / townhall, we might have questions that we would like to ask but did not have the opportunity to ask during the session due to limited time. Some users may wish to ask question anonymously as well.

Hence, this app aims to allow organisers to follow up with the questions were not addressed after the session.

## ELEVATOR PITCH

## USER STORIES

1. user -
2. admin
3. event organizers can set up rooms
4. user creation
5. ??

## WIREFRAME

### As a Host: Login => <home page>

1. => can see all rooms they have (by filter on rooms with host: host.\_id)
2. => can create room => supply {room name} and {room password}, {host: host.\_id} tagged to room
3. => enter a "owned" room => see all questions & able to apply filter (answered (marked as answered during conference) / unanswered) => can answer / delete / edit answers/
<!-- need button to marked the question as answered -->
4. => anything else?

### As an Attendee: Login => <home page>

1. => can see past rooms they have joined (by room.\_id saved on their profile.)
2. => can see upcoming public rooms
3. => key in {room name} & {room password} => successful entry saves the {room.\_id} to a [rooms] array in user's profile => see all answered and unanswered questions.
4. => anything else?

## Public page (not logged in)

1. Show list of hosts?
2. show our Gaddit big big lol

![image](https://drive.google.com/uc?export=view&id=1CLJICfeGjEn1exSMvCJ5jdCH_-jVjTNQ)

## UNSOLVED PROBLEMS

##

Types of users:

<!-- 1. Super admin - to create userID and password for moderator + all ability of moderator -->

1. Host - set up a room for user to enter (generating the password that user need to key in to enter).
   Can have all the ability of normal users -- can delete questions/ comment/

2. Normal users - can post questions, can post comment on own question/ other questions -- to use the app, need to create a nickname and password. This nickname will be used when the user post questions/ comments..

- can like questions
- can see all questions asked by the user

all can have the ability to reset login password

ModelSchema to have:
UserSchema
RoomSchema

Host create room -> tag host ID to room data
User join room -> tag room ID to user data

To trace back host created room -> filter out room based on host ID
To trace user joined room -> filter out room based on room ID

hostA -> roomA
roomA -> hostA
