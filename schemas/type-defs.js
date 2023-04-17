import { gql } from "apollo-server";

const typeDefs = gql`
type User {
  id: ID
  firstname: String
  lastname: String
  username: String
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
  }

type SearchResult {
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
}

type Profile {
  id: ID
  firstname: String
  lastname: String
  email: String
  password: String
  profession: String
  token: String
  mentor: SearchResult
  }

  input RegisterUserInput {
    firstname: String!
    lastname: String!
    username: String!
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
    getMentors(speciality: String): [SearchResult]
    getProfileInfo(username: String): Profile
    getFollowers(username: String): [Follower]
    getFollowings(username: String): [Follower]
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginInput): User!
    registerMentor(user: MentorInput): Mentor
    createFollower(mentorId: ID): Follower
    createFollowerByUsername(username: String): Follower
    removeFollower(mentorId: ID): Int
  }
`;
export default typeDefs;
