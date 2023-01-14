require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3005;

async function startApolloServer() {
  try {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const SequelizeStore = require('connect-session-sequelize')(session.Store);
    const sessionStore = new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 7 * 24 * 60 * 60 * 1000,
    });
    app.use(
      session({
        secret: 'Super secret secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
      })
    );
    sessionStore.sync();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(() => {
      new Promise((resolve) => app.listen(PORT, resolve));
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
        `📭  Query at https://studio.apollographql.com/dev`
      );
      return { apolloServer, app };
    });
  } catch (err) {
    console.log(err.message);
  }
}

startApolloServer();
