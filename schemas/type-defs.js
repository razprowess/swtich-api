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

type Mentor { 
  id: ID
  speciality: String
  experienceinyears: String
  verifyrequest: String
  info: String
  account: User
  followers: [Follower]
  }

type Follower {
status: String
mentor_id: Int
menteeid: ID
togglerequest: Boolean
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
    getMentors(speciality: String): [Mentor]
    getFollower(id: ID): Follower
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginInput): User!
    registerMentor(user: MentorInput): Mentor
    createFollower(mentorId: ID): Follower
    removeFollower(mentorId: ID): Int
  }
`;
export default typeDefs;
