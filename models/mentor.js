import { DataTypes, Model } from "sequelize";
import database from "./database.js";

class Mentors extends Model {
    static async getMentor(id) {
        return this.findOne({where: {accountId: id}})
    }
}

Mentors.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    accountId: {field: "account_id", type: DataTypes.INTEGER },
    speciality: {type: DataTypes.STRING},
    experienceinyears: {type: DataTypes.INTEGER},
    info: {type: DataTypes.STRING},
    verifyrequest: {type: DataTypes.BOOLEAN},
    createdAt: {field: "created_at", type: DataTypes.DATE},
    updatedAt: {field: "updated_at", type: DataTypes.DATE}
},{
sequelize: database,
modelName: 'mentors'
})

export default Mentors