/**
 * @description main server file, runs express app and gives graphql as a middleware
 */

const express = require('express');
const graphqlIHTTP = require('express-graphql');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');

const schema = require('./schema/schema');

env.load();

const app = express();

// allow cross-origin request
app.use(cors());

// connect to mLab DB
// need to put db string with your creds to run in .env file
mongoose.connect('mongodb://tanay:graphql123@ds151863.mlab.com:51863/graphql-demo');
mongoose.connection.once('open', () => {
	console.log('Connection to mLab successful!');
});

app.get('/', (req, res) => res.send('Hello World!' + process.env.PORT));
app.use(
	'/graphql',
	graphqlIHTTP({
		schema,
		graphiql: true,
	})
);

// set port in .env file or env variable as PORT,
// avoid 3000 as client uses that port
app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`));
