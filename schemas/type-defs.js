import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    password: String
    profession: String
    token: String
  }

  type Test {
    color: String
    size: String
    token: String
  }

type Mentor { 
  speciality: String
  experienceinyears: String
  verifyrequest: String
  info: String
  }

  input RegisterUserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    profession: String!
  }

input LoginInput {
email: String!
password: String!
}

input MentorInput {
speciality: String!
experienceinyears: String!
verifyrequest: String
info: String 
}

type Query {
    Users: [User]!
    User(id: ID): User!
    Tests: Test
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginInput): User!
    registerMentor(user: MentorInput): Mentor
  }
`;
export default typeDefs;

