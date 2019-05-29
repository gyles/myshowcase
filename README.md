# myshowcase

This application was generated using JHipster 6.0.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.0.1](https://www.jhipster.tech/documentation-archive/v6.0.1).

## Setup

Before you can start this project, you must install [Node.js][] on your machine.

## Quickstart Guide

To start the application,

```
./mvnw
```

Application will start in [http://localhost:8080/](http://localhost:8080/). You may login with any of the following pre-configured users:

| User             | Password         | Role        |
| ---------------- | ---------------- | ----------- |
| admin            | admin            | User, Admin |
| user             | user             | User        |
| swiftemphatic    | swiftemphatic    | User        |
| anxiousshrimp    | anxiousshrimp    | User        |
| popcornmatrimony | popcornmatrimony | User        |
| maiseyniche      | maiseyniche      | User        |
| clutterpanda     | clutterpanda     | User        |

To run the application tests,

```
./mvnw verify
```

To run the client tests,

```
npm test
```

### Packaging

To package the application,

```
./mvnw -Pprod clean verify
```

### Continuous Integration

Since the application can be packaged as a jar, it is very easy to setup CI/CD pipeline on any platform. As proof of concept, this app has been deployed to Heroku: [https://anz-showcase.herokuapp.com](https://anz-showcase.herokuapp.com).
