# Films Application

Simple React Films Application

[Demo](https://films-database.herokuapp.com/)

## To clone

- You'll need to have [git](https://git-scm.com/), [node](https://nodejs.org/en/) installed in your
  system.

`git clone https://github.com/ArturW1998/Films.git`

## Back-end

### Provides

- express 4.x
- graphql 15.x
- mongoose 5.x

### To install

- Then install the dependencies:

`npm run server-install`

- Copy `.env.example` as `.env` in the server directory

- Replace the database connection string in the .env file

### Run development server

- nodemon 2.x

`npm run server`

Open the web browser to `http://localhost:3005/graphql`

### To build the production package

- pm2 4.x

`npm run server:prod`

## Front-end

### Provides

- react ^17.x
- graphql 15.x
- react-apollo 3.x

### To install

- Then install the dependencies:

`npm run client-install`

### Run development server

- webpack-dev-server 3.x

`npm run client`

Open the web browser to `http://localhost:3000/`

### To build the production package

- webpack 4.x
- babel 7.x

`npm run client:build`

### Unit Testing

- jest 26.x
- @testing-library/react 11.x

To run tests using Jest and React Testing Library:

`npm test` in the client directory

## Back-end & Front-end

### To install

- Then install the dependencies:

`npm run install`

- Copy `.env.example` as `.env` in the server directory

- Replace the database connection string in the .env file

### Run development server

`npm run dev`

Open the web browser to `http://localhost:3000/`

### To build the production package

- Replace the NODE_ENV value with the production value in the .env file in the server directory

- Then run the build:

`npm run build`

### Code Quality

- eslint 7.x
- stylelint 12.x
- prettier 1.x

To do the actual linting and formatting, run:

`npm run lint` / `npm run lint:styles` / `npm run format` / `npm run format:styles`

## Contribute

Please contribute to the project if you know how to make it better, including this README :)
