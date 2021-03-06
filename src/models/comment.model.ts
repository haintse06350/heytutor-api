import { Model, DataTypes } from "sequelize";
import MySQLClient from "../clients/mysql";
import User from "./user.model";

interface CommentInstance extends Model {
  id: number;
  postId: number;
  userId: number;
  isLiked: boolean;
  isEdited: boolean;
  likedBy: string;
  content: string;
  likeCount: number;
  rollComment: number;
}

const Comment = MySQLClient.define<CommentInstance>("Comment", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  postId: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  rollComment: {
    allowNull: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  isLiked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isEdited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  likedBy: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  likeCount: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
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

User.hasMany(Comment, { foreignKey: "id" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default Comment;
