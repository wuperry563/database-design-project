Quickstart

Requirements: 
Postgres 12 or Docker
Current Node.js and NPM(Node package manager)

All 3 applications need to be running. (Express.js API, Angular App, Postgres Database)

to run the front end:

cd front-end
npm install
npm start

to run the express api:

cd express-postgres
npm install
npm start

to run Postgres
In the root folder, if you have docker installed, run 

docker-compose up -d

This will spin up all 3 applications, and the website can be reached at:

http://localhost:4200