# SBCC
 
## Setup

### Database
This sample project needs a mongo database in order to function. A quick database can be spun up by running the command "docker-compose up -d" provide you have docker installed (see here: https://docs.docker.com/desktop/)
Alternatively you can use an existing mongodb instance by providing the connection details as specified in: config\default.json
a database viewer will also be deployed on http://localhost:8081/ (the default collection is set to `sbcc`)

### Database Collections
The API and disbursement function will not run without data in the collections
In order to populate the database please run `npm run bootstrap`

### Running the API
The API can be started by running `npm run start`
you can visit the API at [/api/disbursments/1/](http://localhost:3000/api/disbursments/1/)
or  [/api/disbursments](http://localhost:3000/api/disbursments)

### Task Runner
The task runner can be deployed on a server by running the `task-runner\task.js` script on a node server
Alternatively, on local you can start a server using `npm run start-task-runner`
The task runner is scheduled to run every Monday at midnight. In order to directly trigger the disbursment function simply run `npm run disburse`
