# Web Application: Campus Connect

This platform calculates and shows environmental status, activity etc. for locations at DTU Campus. This is a part of the course Software Engineering 2, Group D's solution.

This repository specifically includes the web application, the visual part of the entire platform.

You can test the platform at <https://se2-webapp04.compute.dtu.dk>. Simply sign in with your DTU Credentials.

## Execution of the Project

Executing this project is simple.

### Prerequisites

We are using Angular 8, so everything for that is required in order to execute the project.

1. Install [node.js](https://nodejs.org/en/download/current/)
2. Install Angular CLI: `npm install --global @angular/cli`

### Run

* Install dependencies: `npm install`
* Serve the project: `ng serve`
* Visit <http://localhost:4200> in the browser

## Build and Publish the Project

The web application can be built in multiple ways. We are using Docker which simplifies deployment a lot for us, though more traditional ways such as copying static files to a server is doable as well.

### Docker

* Install Docker
* Login to docker hub: `docker login`
* Make sure you have access to the docker hub team
* `docker build -t dtugroupd/room-locator-fe:latest .`
* `docker push dtugroupd/room-locator-fe:latest`

To run the container: `docker run -p 4200:80 --name app -d dtugroupd/room-locator-fe:latest`

### Static Files

Open a terminal in the directory of the project and execute:

```bash
ng build --prod
```

A directory called `dist` should appear. These are the static files that can be hosted on a web server.

To change the domain name, modify `src/environments/environment.prod.ts`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests


Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

A good resource for learning Angular is [Fireship](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) (or <https://fireship.io>).
