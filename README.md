NoteWorthy is a note-organizer web app that allows you to write notes for everything from work meetings to lectures from anywhere you like. Unlike Google Docs, NoteWorthy is specifically tailored for note-taking, using notebooks to store notes in an easy-to-organize fashion along with intuitive and simple search functionality.

Website Link: https://white-tree-0076a491e.5.azurestaticapps.net

UI Prototype [2/13/24 - date last updated]: https://www.figma.com/file/5GYM1qprgyysiHXg2SnaT6/NoteWorthy-Prototype?type=design&node-id=0-1&mode=design

Dev Environment Setup:

- Install Node.js, NPM, and Mongosh. Create a Mongo Atlas account.
- Clone repo
- run npm install on both front and backend
- run 'npm run format' and 'npm run lint' each time changes are made to front or backend
- run jest tests with 'npm test' to ensure backend functionality
- pull request code to master to deploy to Azure webapp
- for local testing, include all environment variables in .env files in front and backend

[UML Diagram (2/22/24 - date last updated)](docs/UML.md)

[Coverage Report](docs/Coverage.md)
-db line 14 should be uncovered, it's an error that shouldn't ever run.
