import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean. Int, Float, ID

// Demo user data
const users = [
  {
    id: 1,
    name: "Danny",
    email: "dani@lo.com",
    age: 55,
  },
  {
    id: 2,
    name: "Koji",
    email: "ko@ji.com",
    age: 10,
  },
  {
    id: 3,
    name: "Ayumi",
    email: "a@yu.mi",
    age: 17,
  },
  {
    id: 4,
    name: "Nico",
    email: "nico@tesla.co",
    age: 62,
  },
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: 1,
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL post...",
    published: true,
    author: 1,
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: true,
    author: 3,
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());

        return isTitleMatch || isBodyMatch;
      });
    },
    me() {
      return {
        id: "12412412",
        name: "Koji",
        email: "koji@ai.com",
      };
    },
    post() {
      return {
        id: "46546",
        title: "AI for you and me",
        body: "",
        published: false,
      };
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => console.log("The server is up!"));
