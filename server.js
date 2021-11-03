const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;

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
server.applyMiddleware({ app });

app
  .listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
  })
  .then(({ url }) => {
    console.log(`YOUR API IS RUNNING AT: ${url} :)`);
  });
