import { Model, DataTypes } from "sequelize";
import database from "./database.js";
import Mentors from "./mentor.js";

class Accounts extends Model {
    static async getUser(email){
        return this.findOne({where: { email }})
    }

    static async getUserByUsername(username){
        return this.findOne({where: { username }})
    }
    
    static async getProfileData(id){
        return this.findOne({where: {id}, 
            include: {model: Mentors, required: false}});
    }

    static async getProfileInfoByUsername(username){
        return this.findOne({where: {username}, 
            include: {model: Mentors, required: false}});
    }

    static async updateProfile(user){
        let res;
        const {firstname, lastname, username, info, experienceinyears, bio, speciality, imgurl, id} = user;
    const response =  await this.update({firstname, lastname, bio, imgurl},{where: {username}});
    if(speciality){
       res =  await Mentors.update({info, speciality, experienceinyears}, {where: { accountId: id }});
    }
    return response[0] && res[0];
    }
}


Accounts.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type:DataTypes.STRING},
    username: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: 'mentee'},
    profession: {type: DataTypes.STRING},    
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    userid: {type: DataTypes.STRING},
    imgurl: {type: DataTypes.STRING},
    bio: {type: DataTypes.STRING},
    createdAt: {field: "created_at", type: DataTypes.DATE},
    updatedAt: {field: "updated_at", type: DataTypes.DATE}
},{
    sequelize: database,
    modelName: "accounts"
})

Accounts.hasOne(Mentors);
Mentors.belongsTo(Accounts);

export default Accounts;

