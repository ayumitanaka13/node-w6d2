// import greeting, { message, name } from "./myModule";

// console.log(message, name);
// console.log(greeting("Amy"));

import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello: String!,
        name: String!,
        location: String!,
        bio: String!,
    }
`;

const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Coach Koji";
    },
    location() {
      return "Behind you";
    },
    bio() {
      return "Born in Japan";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(()=>{console.log("The server is up!")})