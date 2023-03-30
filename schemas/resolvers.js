import AccountsServices from "../services/accounts.js";
import MentorsServices from "../services/mentors.js";


const resolvers = {
  Query: {
Tests: ()=> {
    const obj = {color: "green", size: "big", token: "hello world"}
    return obj;
},

getMentors: async(_, args)=>{
const {speciality} = args;
const result = await MentorsServices.getMentors(speciality);
return result;
}
  },

  Mutation: {
    registerUser: async (_, args) => {
      return await AccountsServices.registerUser({ ...args.user });
    },
    loginUser: async(_, args)=>{
        return await AccountsServices.loginUser({...args.user});
    },
    registerMentor: async(_, args, context)=>{
       const {id} = context
      const data = {
          user: {...args.user},
          id
      }
       return await MentorsServices.registerMentor(data);
      
    }
  },
};

export default resolvers;
