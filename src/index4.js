import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        greeting(name:String): String!,
        add(numbers:[Float!]!): Float!,
        grades: [Int!]!,
        me: User!,
        post: Post
    }

    type User {
        id: ID!,
        name: String!,
        email: String!,
        age: Int,
    }

    type Post {
        id: ID!,
        title: String!,
        body: String!,
        published: Boolean!,
    }

`;

const resolvers = {
  Query: {
    // ctx - context
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      } else {
        return "Hello user";
      }
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((acc, curr) => {
        acc + curr;
      });
    },
    grades() {
      return [99, 80, 93];
    },
    me() {
      return {
        id: "12",
        name: "Koji",
        email: "koji@gmail.com",
        age: 12,
      };
    },
    post() {
      return {
        id: "22",
        title: "Hi",
        body: "",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
