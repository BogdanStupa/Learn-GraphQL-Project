const express = require("express");
const graphqlHTTP = require('express-graphql');
const cors =  require("cors");
const mongoose = require("mongoose");;

const schema = require("./schema"); 

mongoose.connect("mongodb://127.0.0.1:27017/trainQl",{ 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const PORT = 3005;

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true 
}));

const dbConnection = mongoose.connection;
dbConnection.on("error", err => console.log(`Mongoose connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB"));

app.listen(PORT, err => {
    err ? console.log(err) : console.log("Server started");
});