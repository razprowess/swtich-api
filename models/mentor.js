import { DataTypes, Model } from "sequelize";
import Accounts from "./account.js";
import database from "./database.js";
import Followers from "./follower.js";

class Mentors extends Model {
  static async getMentor(id) {
    return this.findOne({ where: { accountId: id } });
  }

  static async getMentorBySpeciality(speciality) {
    return this.findAll({
      where: { speciality: speciality },
      include: [
        {
          model: Accounts,
          required: true,
        },
        {
          model: Followers,
          required: false,
        },
      ],
    });
  }
}

Mentors.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    accountId: { field: "account_id", type: DataTypes.INTEGER },
    speciality: { type: DataTypes.STRING },
    experienceinyears: { type: DataTypes.INTEGER },
    info: { type: DataTypes.STRING },
    verifyrequest: { type: DataTypes.BOOLEAN },
    createdAt: { field: "created_at", type: DataTypes.DATE },
    updatedAt: { field: "updated_at", type: DataTypes.DATE },
  },
  {
    sequelize: database,
    modelName: "mentors",
  }
);

Mentors.hasMany(Followers, { foreignKey: "mentor_id" });
Followers.belongsTo(Mentors, { foreignKey: "mentor_id" });

export default Mentors;
