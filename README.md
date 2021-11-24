
# VH-Manager - Fleet Management System RESTfUL API
VH-Manager is a RESTful API for Fleet Management System. This system enables the company to manage all the resources of the fleet and the vehicle booking.
the system composed by:

- Vehicles management
- Drivers management
- Fuels consumption management
- Vehicle expenses management
- Vehicle bookings management
- Customers maangement

## Built With
- [NestJS](https://nestjs.com/) a progressive Node.js framework built with TypeScript
- [MongoDB](https://www.mongodb.com/) a document-oriented NoSQL database
- [Mongoose](https://mongoosejs.com/) MongoDB object modeling for Node.js
- [JWT](https://jwt.io/) standard for signature and optional encryption
- [Bcrypt](https://www.npmjs.com/package/bcrypt) a password hashing library
- [PassportJS](http://www.passportjs.org/) an authentication middleware for Node.js
- [Swagger](https://swagger.io/) tools for documenting  RESTful APIs


## Installation

### Installation with docker
Install docker on Mac, Windows or Linux [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

For Linux you need to install docker compose separately here [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

```bash
# Get the latest snapshot
$ git clone https://github.com/Adib128/vh-manager.git

# Change directory
$ cd vh-manager

# Runing the docker container
$ docker-compose up

```
Now if you go to https://vh-manager.herokuapp.com/api-docs/, you'll get

### Installation without docker

You can install the project on your own server.
```bash
# Get the latest snapshot
$ git clone https://github.com/Adib128/vh-manager.git

# Change directory
$ cd vh-manager

# Install NPM dependencies
$ npm install

# Then simply start the project
$ npm run start
```

## Documentation

You'll find the documentation here [https://vh-manager.herokuapp.com/api-docs/](https://vh-manager.herokuapp.com/api-docs/).
