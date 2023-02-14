import AccountsServices from "../services/accounts.js";
import MentorsServices from "../services/mentors.js";


const resolvers = {
  Query: {
Tests: ()=> {
    const obj = {color: "green", size: "big", token: "hello world"}
    return obj;
}
  },

  Mutation: {
    registerUser: async (_, args) => {
      console.log("sign up resolver called");
      return await AccountsServices.registerUser({ ...args.user });
    },
    loginUser: async(_, args)=>{
        console.log("resolver called");
        return await AccountsServices.loginUser({...args.user});
    },
    registerMentor: async(_, args, context)=>{
      console.log("mentor resolver called");
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
