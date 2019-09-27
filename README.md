# RoomLocatorWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Run the project

* Make sure to install [node.js](https://nodejs.org/en/download/current/)
* Install the Angular CLI: `npm install --global @angular/cli`
* Clone this repository and cd into it
* Install dependencies: `npm install`
* Serve the project: `ng serve`
* Visit <http://localhost:4200> in the browser

## Build and Publish project

* Install Docker
* Login to docker hub: `docker login`
* Make sure you have access to the docker hub team
* `docker build -t dtugroupd/room-locator-fe:latest .`
* `docker push dtugroupd/room-locator-fe:latest`

To run the container: `docker run -p 4200:80 --name app -d dtugroupd/room-locator-fe:latest`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

A good resource for learning Angular is [Fireship](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) (or <https://fireship.io>).
