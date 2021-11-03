const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

server.applyMiddleware({ app });

app.listen().then(({ url }) => {
    console.log(`YOUR API IS RUNNING AT: ${url} :)`);
  });


