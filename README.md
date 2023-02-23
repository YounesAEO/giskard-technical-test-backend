# Giskard AI Technical Test

-   The backend implementation of Giskard AI technical [test](https://giskard.notion.site/Technical-exercise-Full-stack-software-engineer-0c3ff2e612994e2183abd7b7330b5f9a)

## To-do List

### Config

-   [x] set up express server
-   [x] implement basic CRUD services
-   [x] connect MongoDB

### Availability

-   [x] create model
-   [x] create service
-   [x] test
-   [x] POST /availabilities
-   [x] test
-   [x] delete service
-   [x] test
-   [x] DELETE /availabilities/:id
-   [x] test
-   [x] createOrUpdate Service

### Reservation

-   [x] create model
-   [x] create service
-   [x] test
-   [x] POST /reservations
-   [x] test
-   [x] delete service
-   [x] test
-   [x] DELETE /reservations/:id
-   [x] test
-   [x] DELETE /reservation given email

### To Run Locally

1. clone repo: `git clone https://github.com/YounesAEO/giskard-technical-test-backend.git`
2. install dependencies: `npm install`
3. add the follwing env variables in a .env file:
   `MONGODB_URI=LINK_TO_MONGODB_INSTANCE`
   `PORT=`
4. run project: `npm run dev`
