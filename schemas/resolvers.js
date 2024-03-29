import AccountsServices from "../services/accounts.js";
import FollowersServices from "../services/followers.js";
import MentorsServices from "../services/mentors.js";

const resolvers = {
  Query: {
    getMentors: async (_, args, context) => {
      const { speciality } = args;
      const { id } = context;
      const result = await MentorsServices.getMentors(speciality, id);
      return result;
    },

    getProfileInfo: async (_, args, context) => {
      const { id } = context;
      const { username } = args;
      if(username){
        const response = await AccountsServices.getProfileInfoByUsername(username);
        return response;
      }
      const result = AccountsServices.getProfileInfo(id);
      return result;
    },

    getFollowers: async (_, args, context) => {
      const { id } = context;
      const { username } = args;
      if (username) {
        const response = await MentorsServices.getFollowersByUsername(username);
        return response;
      }
      const result = MentorsServices.getFollowers(id);
      return result;
    },

    getFollowings: async (_, args, context) => {
      const { id } = context;
      const { username } = args;
      if (username) {
        const result = await FollowersServices.getFollowingsByUsername(
          username
        );
        return result;
      }
      const result = await FollowersServices.getFollowings(id);
      return result;
    },
  },

  Mutation: {
    registerUser: async (_, args) => {
      return await AccountsServices.registerUser({ ...args.user });
    },
    loginUser: async (_, args) => {
      return await AccountsServices.loginUser({ ...args.user });
    },
    registerMentor: async (_, args, context) => {
      const { id } = context;
      const data = {
        user: { ...args.user },
        id,
      };
      return await MentorsServices.registerMentor(data);
    },
    createFollower: async (_, args, context) => {
      const { id } = context;
      const { mentorId } = args;
      const data = { id, mentorId: +mentorId };
      return await FollowersServices.registerFollower(data);
    },

    createFollowerByUsername: async (_, args, context)=>{
      const {id} = context;
      const {username} = args;
      const data = {id, username};
      FollowersServices.registerFollowerByUsername(data);
    },

    removeFollower: async (_, args, context) => {
      const { id } = context;
      const { mentorId } = args;
      const data = { id, mentorId: +mentorId };
      return await FollowersServices.removeFollower(data);
    },

    updateProfile: async (_, args, context) =>{
      const {id, username} = context;
      return AccountsServices.updateProfile({...args.user, id, username});  
    }
  },
};

export default resolvers;
