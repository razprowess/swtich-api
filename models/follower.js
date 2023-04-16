import { Model, DataTypes } from "sequelize";
import database from "./database.js";
import Mentors from "./mentor.js";

class Followers extends Model {
  static async createFollower(data) {
    return this.create({ ...data });
  }

  static async deleteFollower(data) {
    const { mentorId, id } = data;
    return this.destroy({ where: { menteeid: id, mentor_id: mentorId } });
  }

  static async getFollowings(id) {
    return this.findAll({ where: { menteeid: id } });
  }
}

Followers.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mentor_id: { field: "mentor_id", type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    menteeid: { type: DataTypes.INTEGER },
    createdAt: { field: "created_at", type: DataTypes.DATE },
    updatedAt: { field: "updated_at", type: DataTypes.DATE },
  },
  {
    sequelize: database,
    modelName: "followers",
  }
);

export default Followers;
