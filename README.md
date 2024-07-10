# Node.js API Exercise

Welcome to our coding exercise! Some things to note:

* It's a Node.JS (20.12.2) app
* It uses a SQLite DB
* The app runs on port 3000

## Installation

Install Node if you don't already have it; you'll need at least version (20.12.2)

To start the app:
```sh
$ npm ci
$ npm run db:create
$ npm run db:populate
$ npm start
```

You can check it's working with `curl localhost:3000`

To run tests:
```sh
$ npm ci
$ npm run db:create:tests
$ npm test
```

## Coding Exercise Instructions

We want to launch a new feature that lets users get informed about what recently happened. We are building a Petitions newsfeed. As part of the team, you’ll contribute to the delivery of this feature: a Petitions newsfeed. **We are asking you to build the back-end to support this feature.** A newsfeed is a timeline of multiple events that happened and that you might be interested in.

Our Newsfeed will display:
- Latest 3 created petitions
- Latest petitions that are created from your network (petition starters you follow)

Here are the details of the API endpoints you will work on:
**Recent petitions**
- `/petitions` is provided
- currently returns all petitions
- you will need to modify to return the 3 most recently created petitions from the past week

**Personalized petitions**
- you will need to build this endpoint
- it should return a list of petitions from starters that you follow ordered by most recently updated


### Evaluation Criteria
- JavaScript/Node best practices
- Completeness: Did you include all features?
- Readability: Is the solution written in a clean way so others can understand?
- Testing: Has the solution been adequately tested?

Please organize, design, test, and document your code as if it were going into production - then push your changes to the main branch. After you have pushed your code, you must submit the assignment via the assignment page.

All the best and happy coding,

The Change.org Team