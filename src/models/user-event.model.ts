import { Model, DataTypes } from "sequelize";
import MySQLClient from "../clients/mysql";

interface UserEventInstance extends Model {
  id: number;
  userId: number;
  eventId: number;
  isSupporter: boolean;
  isRequestor: boolean;
}

const UserEvent = MySQLClient.define<UserEventInstance>("UserEvent", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  eventId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  isSupporter: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  isRequestor: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: MySQLClient.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: MySQLClient.literal("CURRENT_TIMESTAMP"),
  },
});

export default UserEvent;