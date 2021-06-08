import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        // title: String!,
        // price: Float!,
        // releaseYear: Int,
        // rating: Float,
        // isStock: Boolean!
        me: User!
    }

    type User {
        id: ID!,
        name: String!,
        email: String!,
        age: Int,
    }
`;

const resolvers = {
  Query: {
    title() {
      return "The art of war";
    },
    price() {
      return 12.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 5;
    },
    isStock() {
        return true;
    }
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(()=>{console.log("The server is up!")})