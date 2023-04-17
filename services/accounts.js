import AccountModel from "../models/account.js";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import config from "../config/dev.json" assert {type: 'json'};
const TOKEN_SECRET = "efekdgnrifmenme8u93i4n3i9i0k-834i3j2iejr02d*)(*&*&jd20e02di93ej2ij29"

class AccountsServices {
  static async loginUser({email, password}) {
    const oldUser = await AccountModel.getUser(email);
    if (!oldUser) {
      throw new ApolloError("Invalid login credentials");
    }
    
    const match = await bcrypt.compare(password, oldUser.password);
    if (match) {
      const token = await jwt.sign(
        { id: oldUser.id, email: oldUser.email, username: oldUser.username, role: oldUser.role },
        TOKEN_SECRET,
        { expiresIn: "1y", algorithm: "HS256" }
      );
      oldUser.token = token;
      return oldUser;
    } else {
      throw new ApolloError("password is not a match. Please try again");
    }
  }

  static async registerUser({
    firstname,
    lastname,
    email,
    password,
    profession,
    username,
  }) {
    
    const oldUser = await AccountModel.getUser(email);

    if (oldUser) {
      throw new ApolloError("user already exist", "405");
    }

    const usernameCheck = await AccountModel.getUserByUsername(username);
    if(usernameCheck){
        throw new ApolloError("username already exist", "405");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const userid = await bcrypt.hash(email, 10);
    const role = 'mentee';
    const newUser = await AccountModel.create({
      firstname,
      lastname,
      username,
      profession,
      email,
      password: encryptedPassword,
      userid: userid,
    });
    if (newUser) {
        const token = await jwt.sign(
            { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role },
            TOKEN_SECRET,
            { expiresIn: "1y", algorithm: "HS256" }
          );
          newUser.token = token;
      return newUser;
    } else {
      throw new ApolloError("Could not create an create account", "500");
    }
  }

  static async getProfileInfo(id){
    const result = await AccountModel.getProfileData(id);
    if(!result){
      throw new ApolloError("User not found", "404");      
     }
     return result;
  }
  static async getProfileInfoByUsername(username){
    const result = await AccountModel.getProfileInfoByUsername(username);
    if(!result){
     throw new ApolloError("User not found", "404");      
    }
    return result;

  }
  
}

export default AccountsServices;
