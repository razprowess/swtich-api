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
        // console.log("there is a match");
      const token = await jwt.sign(
        { id: oldUser.id, email: oldUser.email },
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
  }) {
    
    const oldUser = await AccountModel.getUser(email);

    if (oldUser) {
      throw new ApolloError("user already exist", "405");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userid = await bcrypt.hash(email, 10);
    const newUser = await AccountModel.create({
      firstname,
      lastname,
      profession,
      email,
      password: encryptedPassword,
      userid: userid,
    });
    if (newUser) {
        const token = await jwt.sign(
            { id: newUser.id, email: newUser.email },
            TOKEN_SECRET,
            { expiresIn: "1y", algorithm: "HS256" }
          );
          newUser.token = token;
      return newUser;
    } else {
      throw new ApolloError("Could not creat an create account", "500");
    }
  }
}

export default AccountsServices;
