require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const sequelize = require('./config/connection');
    const SequelizeStore = require('connect-session-sequelize')(session.Store);
    const sess = {
      secret: 'Super secret secret',
      cookie: {},
      resave: false,
      saveUninitialized: true,
      logging: false,
      store: new SequelizeStore({
        db: sequelize,
      }),
    };
    app.use(session(sess));
    await server.start();
    server.applyMiddleware({ app });
    sequelize.sync({ force: false }).then(() => {
      app.listen(() => {
        new Promise((resolve) => app.listen(PORT, resolve));
        console.log(`API server running on port ${PORT}!`);
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        return { server, app };
      });
    });
  } catch (e) {
    console.log(e);
  }
}
startApolloServer();
