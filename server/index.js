const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");
const databaseConfig = require("./Config/database");
const typeDefs = require("./Graphql/typeDefs.js");
const resolvers = require("./Graphql/Resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(databaseConfig.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connection success");
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server is running at ${res.url}`);
  });
