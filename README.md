# Task Logger API

Task Logging API that handles creation, updating, deleting, and retrieving all tasks. The production build is currently hosted in AWS EC2.

## Prerequisites

**Node**
- 20.13.1 on stable channel

**Secrets and Environments**

This project includes `.env` in the repository since this is just an exercise.

**Running the API**

Run the following command to start up the API locally.
Note: To have mongodb connection successfully run or establish, I must add your
IP address in IP Access List. To save ourselves from the hassle, I have already publish and hosted the API in AWS EC2.

```sh
    # install the dependencies
    npm install
    # build the bundle
    npm run build:prod
    # start the bundle
    npm run start
```
