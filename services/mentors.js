import { ApolloError } from "apollo-server-errors";
import Mentors from "../models/mentor.js";

class MentorsServices {
  static async registerMentor(data) {
    const {user, id} = data;
      if(!user.verifyrequest){
      user.verifyrequest = false    
      }

      const mentor =  await Mentors.getMentor(id);
      console.log("mentor: ", mentor);
      if(mentor) throw new ApolloError("You already have a mentor account");

    const response = await Mentors.create({...user, account_id:id});
    if (!response) {
      throw new ApolloError("failed to register a mentor", "404");
    }
    return response;
  }
}

export default MentorsServices;
