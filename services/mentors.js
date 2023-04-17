import { ApolloError } from "apollo-server-errors";
import Mentors from "../models/mentor.js";

class MentorsServices {
  static async registerMentor(data) {
    const {user, id} = data;
      if(!user.verifyrequest){
      user.verifyrequest = false    
      }

      const mentor =  await Mentors.getMentor(id);
      if(mentor) throw new ApolloError("You already have a mentor account");

    const response = await Mentors.create({...user, account_id:id});
    if (!response) {
      throw new ApolloError("failed to register a mentor", "404");
    }
    return response;
  }

  static async getMentors(speciality, id){
   const mentor = await Mentors.getMentorBySpeciality(speciality, id);
if(!mentor){
  throw new ApolloError('Failed to fetch mentor list');
}
   if(mentor){
    return mentor
   }
   return [];
  }

  static async getFollowers(id){
    const result = await Mentors.getFollowers(id);
    if(!result){
      throw new ApolloError('Failed to fetch mentor list', '404');
    }
    return result;
  }

  static async   getFollowersByUsername(username){
    const result = await Mentors.getFollowersByUsername(username);
    if(!result){
      throw new ApolloError('Failed to fetch mentor list', '404');
    }
    return result;
  }

}

export default MentorsServices;
