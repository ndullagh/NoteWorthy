NoteWorthy is a note-organizer web app that allows you to write notes for everything from work meetings to lectures from anywhere you like. Unlike Google Docs, NoteWorthy is specifically tailored for note-taking, using notebooks to store notes in an easy-to-organize fashion along with intuitive and simple search functionality.

UI Prototype: https://www.figma.com/proto/5GYM1qprgyysiHXg2SnaT6/NoteWorthy-Prototype?type=design&node-id=7-2&t=40bJvrXPCxvF4c1G-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=7%3A2

Dev Environment Setup:
- Install Node.js, NPM, and Mongosh. Create a Mongo Atlas account.
- Clone repo
- run npm install on both front and backend
- run 'npm run format' and 'npm run lint' each time changes are made to front or backend
- run jest tests with 'npm test' to ensure backend functionality
- pull request code to master to deploy to Azure webapp
- for local testing, include all environment variables in .env files in front and backend

[UML Diagram](docs/UML.md)

[Coverage Report](docs/Coverage.md)
-db line 14 should be uncovered, it's an error that shouldn't ever run.