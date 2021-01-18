const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { connect: mongooseConnect, connection: dbConnection } = require('mongoose');

const schema = require('../schema/schema');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { SERVER_PORT, DB_NAME, DB_USER_NAME, DB_USER_PASSWORD, DB_CLUSTER } = process.env;

const app = express();
const PORT = SERVER_PORT || 3005;

mongooseConnect(
    `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_CLUSTER}.qlx4n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => err ? console.log(err) : console.log(`Server is running on port ${PORT}!`));
