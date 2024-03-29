 import { ApolloError } from "apollo-server-errors";
import FollowerModel from "../models/follower.js";

class FollowersServices {
  static async registerFollower(data) {
    const {mentorId, id} = data;
    const params = {mentor_id: mentorId, status: 'pending', menteeid: id};
     const response = await FollowerModel.createFollower(params);
    if (!response) {
      throw new ApolloError("failed to create a follower", "404");
    }
    return response;
  }

  static async registerFollowerByUsername(data) {
     const response = await FollowerModel.createFollowerByUsername(data);
    if (!response) {
      throw new ApolloError("failed to create a follower", "404");
    }
    return response;
  }
  
  static async removeFollower(data){
    const response = await FollowerModel.deleteFollower(data);
    if(!response){
        throw new ApolloError('failed to delete a follower', '404');
    }
    return response;
  }

  static async getFollowings(id){
    const response = await FollowerModel.getFollowings(id);
    if(!response){
      throw new ApolloError('Fail to retrieve following data', '404');
    }
    return response;
  }

  static async getFollowingsByUsername(username){
    const response = await FollowerModel.getFollowingsByUsername(username);
    if(!response){
      throw new ApolloError('Fail to retrieve following data', '404');
    }
    return response;
  }
}

export default FollowersServices;
